const feathers = require('@feathersjs/feathers')
const express = require('@feathersjs/express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const app = express(feathers())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Регистрируем сервис
app.use('/todos', {
    get(id) {
        return Promise.resolve({ id });
    }
})

// Регистрируем промежуточное ПО express.js
app.use('/test', (req, res) => {
    res.json({
        message: 'Привет из промежуточного ПО express.js'
    })
})

// Регистрирует множество промежуточного ПО express.js
app.use('/test', (req, res, next) => {
    res.data = 'Шаг 1 работает'
    next()
}, (req, res) => {
    res.json({
        message: 'Привет из промежуточного ПО express.js ' + res.data
    })
})

module.exports = app
