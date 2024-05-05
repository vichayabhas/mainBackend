const mongoose = require("mongoose");
const PeeCampSchema = new mongoose.Schema({
    buildingId: {//building
        type: String
    },
    flore: {
        type: String
    },
    room: {
        type: String
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
module.exports = mongoose.model('Place', PeeCampSchema)