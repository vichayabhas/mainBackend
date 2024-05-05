const mongoose = require("mongoose");




const PeeCampSchema = new mongoose.Schema({
    userId: {//user
        type: String
    }
})
module.exports = mongoose.model('HelthIsue', PeeCampSchema)