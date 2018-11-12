module.exports = errorHandler

function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        // aplikasi error
        return res.status(400).json({ message: err })
    }

    if (err.name === 'ValidationError') {
        // Terdapat error pada mongoose
        return res.status(400).json({ message: err.message })
    }

    if (err.name === 'UnauthorizedError') {
        // Autentikasi JWT Gagal
        return res.status(401).json({ message: 'Invalid Token' })
    }

    // Default error
    return res.status(500).json({ message: err.message })
}