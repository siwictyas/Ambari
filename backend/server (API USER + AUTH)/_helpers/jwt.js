const expressJwt = require('express-jwt')
const config = require('config.json')
const userService = require('../services/user_Service')

module.exports = jwt

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // routes yang bersifat publik tidak perlu terautentikasi
            '/users/authenticate',
            '/users/register'
        ]
    })
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub)

    // Menghapus token apabila user sudah dihapus
    if (!user) {
        return done(null, true)
    }

    done()
}