const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + process.env.DB_URL)
})
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err)
})
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected')
})

gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg)
        callback()
    })
}

process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2')
    })
})

process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0)
    })
})

require('./models/schema.ZabbixCli')
require('./models/schema.Items')
require('./models/schema.Triggers')
require('./models/schema.Evets')
