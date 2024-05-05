const mongoose = require("mongoose");
const PeeCampSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL', 'XXL', '3XL']
    },
    campModelId: {
        type: String
    },
    role: {
        type: String,
        enum: ['nong', 'pee', 'peto']
    },
    recive: {
        type: String,
        enum: ['baan', 'part']
    },
    recived: {
        type: Number,
        default: 0
    }
})
module.exports = mongoose.model('ShertManage', PeeCampSchema)