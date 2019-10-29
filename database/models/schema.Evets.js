const mongoose = require('mongoose')

const EventsSchema = new mongoose.Schema({
    "TriggersIDSchema": {
        type: mongoose.Schema.Types.ObjectId
    },
    "description": {
        type: String
    },
    "itemid": {
        type: String,
        required: true
    },
    "status": {
        type: String,
        required: true
    },
    "eventStatus": {
        type: Boolean,
        required: true
    },
    "level": {
        type: String,
        required: true
    },
    "eventTimeStart": {
        type: Date
    },
    "eventTimeUpdate": {
        type: Date
    },
    "eventTimeNormalized": {
        type: Date
    },
    "eventTimeClose": {
        type: Date
    },
    "lastClock": {
        type: Number
    },
    "lastValue": {
        type: Number
    },
    "historyChange": [{
        type: String
    }]
})

mongoose.model('EventsAlert', EventsSchema, 'events')