const {Schema, model} = require('mongoose');

const urlSchema = Schema({
    url: {
        type: String,
        require: true
    },
    id: {
        type: Number,
        require: true
    }
});

module.exports = model('Url', urlSchema);