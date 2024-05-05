const mongoose = require("mongoose");




const PeeCampSchema = new mongoose.Schema({
    name: {
        type: String
    },
    placeIds: {//place
        type: [String],
        default: []
    },
    actionPlanIds: {//actionPlan
        type: [String],
        default: []
    },
    fridayActIds: {//fridayAct
        type: [String],
        default: []
    }

})
module.exports = mongoose.model('Building', PeeCampSchema)