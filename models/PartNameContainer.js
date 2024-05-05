const mongoose = require("mongoose");
const PeeCampSchema = new mongoose.Schema({
    campIds: {//camp
        type: [String],
        default: []
    },
    name: {
        type: String
    },
    partIds: {
        type: [String],
        default: []
    }
})
module.exports = mongoose.model('NameContainer', PeeCampSchema)