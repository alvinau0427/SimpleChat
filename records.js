const { EventEmitter } = require('events');
const mongoose = require('./db-connector.js');
const schema = require('./schema.js');
const Message = mongoose.model('Message', schema);

let instance;
let data = [];
let MAX = 50;

class Records extends EventEmitter {
    constructor() {
        super();
    }

    push(msg) {
        const m = new Message(msg);
        m.save();
        this.emit('new_message', msg);
        if (data.length > MAX) {
            data.splice(0, 1);
        }
    }

    get (callback) {
        Message.find((err, msgs) => {
            callback(msgs);
        });
    }

    setMax(max) {
        MAX = max;
    }

    getMax() {
        return MAX;
    }
}

module.exports = (function () {
    if (!instance) {
        instance = new Records();
    }
    return instance;
})();
