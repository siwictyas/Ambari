const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db')
const User = db.User

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
}

async function authenticate({ username, password }) {
    const user = await User.findOne({ username })
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject()
        const token = jwt.sign({ sub: user.id }, config.secret)
        return {
            ...userWithoutHash,
            token
        }
    }
}

// Mendapatkan seluruh data user tanpa menampilkan password
async function getAll() {
    return await User.find().select('-hash')
}

// Mendapatkan data user berdasarkan ID tanpa menampilkan password
async function getById(id) {
    return await User.findById(id).select('-hash')
}

async function create(userParam) {
    // Validasi username
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" Sudah Terdaftar!'
    }

    const user = new User(userParam)

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10)
    }

    // Menyimpan user
    await user.save()
}

// Memperbaharui data user
async function update(id, userParam) {
    const user = await User.findById(id)

    // validasi data user yang dipilih untuk dilakukan update
    if (!user) throw 'User not found'
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" Sudah Terdaftar!'
    }

    // Melakukan hash password
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // Menyalin property userParam pada user
    Object.assign(user, userParam)

    await user.save()
}
    // Menghapus user yang dipilih berdasarkan ID
async function _delete(id) {
    await User.findByIdAndRemove(id)
}