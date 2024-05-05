const mongoose = require("mongoose");
const PeeCampSchema = new mongoose.Schema({
    refId: {//camp
        type: String
    },
    types: {
        type: String,
        enum: ['camp', 'baan']
    }
})
module.exports = mongoose.model('CampStyle', PeeCampSchema)