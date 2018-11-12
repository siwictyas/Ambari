require('rootpath')()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('_helpers/jwt')
const errorHandler = require('_helpers/error-handler')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// Menggunakan autentikasi dengan JWT untuk mengamankan API
app.use(jwt())

// ROUTES API
app.use('/users', require('./routes/Users'))

// Error handler
app.use(errorHandler)

// Menjalankan Server pada Port 3000
const port = process.env.NODE_ENV === 'production' ? 80 : 3000
const server = app.listen(port, function () {
    console.log('Server berjalan pada PORT ' + port)
})