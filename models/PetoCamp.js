const mongoose = require("mongoose");
const PeeCampSchema = new mongoose.Schema({
    campId: {
        type: String
    },
    partId: {
        type: String
    },
    petoShertManageIds: {
        type: [String],
        default: []
    }
})
module.exports = mongoose.model('PetoCamp', PeeCampSchema)