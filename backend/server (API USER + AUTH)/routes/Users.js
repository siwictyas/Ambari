const express = require('express')
const router = express.Router()
const userService = require('services/user_Service')

// routes
router.post('/authenticate', authenticate)
router.post('/register', register)
router.get('/', getAll)
router.get('/:id', getById)
router.put('/:id', update)
router.delete('/:id', _delete)

module.exports = router

//Fungsi untuk autentikasi
function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username atau Pasword Salah' }))
        .catch(err => next(err))
}

// Fungsi untuk menambah user baru
function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json("User Berhasil Didaftarkan!"))
        .catch(err => next(err))
}

// Menampilkan seluruh user yang terdaftar
function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err))
}

// Menampilkan user berdasarkan ID
function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err))
}

// Melakukan update data user
function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json("Data User Berhasil Diubah!"))
        .catch(err => next(err))
}

// Menghapus data user
function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json("User Berhasil Dihapus!"))
        .catch(err => next(err))
}