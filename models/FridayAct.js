const { default: mongoose } = require("mongoose");


const fridayActSchema = new mongoose.Schema({
    company: {
        type: String,
        require: [true, 'Plese fill company']
    },
    date: {
        type: Date
    },
    staffId: {//user
        type: [String],
        default: []
    },
    limit: {
        type: Number
    },
    studentId: {//user
        type: [String],
        default: []
    },
    placeId: {//place
        type: String
    }
})
module.exports = mongoose.model('FridayAct', fridayActSchema)