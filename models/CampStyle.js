const mongoose = require("mongoose");
const PeeCampSchema = new mongoose.Schema({
    campId: {//camp
        type: String
    },
    
})
module.exports = mongoose.model('CampStyle', PeeCampSchema)