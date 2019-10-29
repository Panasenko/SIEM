const _ = require('lodash')
const HistoryWorker = require('./worker.history')
const ZabbixCliDB = require('../../database/controllers/controll.ZabbixCli')

let instance = null

class Initializer {
    constructor() {
        if (instance) {
            instance = this
        }
        this._observers = []
        this.startWorkerHistory()
        return instance
    }

    async startWorkerHistory() {
        let data = await ZabbixCliDB.find({})
        _.forEach(data, async (item) => {
            return await this.createWorkers(new HistoryWorker(item))
        })
    }

    createWorkers(obj) {
        this._observers.push(obj)
    }

    deleteWorkers(id) {
        this._observers = _.filter(this._observers, subscriber => String(subscriber._id) !== id)
    }

    updateWorkers(id) {
        _.forEach(this._observers, (subscriber) => {
            if (String(subscriber._id) === id) {
                subscriber.updateProperties()
            }
        })

    }

}

module.exports = new Initializer()