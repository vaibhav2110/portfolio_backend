const mongoose = require('mongoose');
const schema = mongoose.Schema;

const querySchema = new schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

module.exports = Query = mongoose.model('query', querySchema);