import mongoose from "mongoose"
const PeeCampSchema = new mongoose.Schema({
    campId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    partId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    baanId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    peeIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    peeCampMemberCardIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    arrayString1: {
        type: [String],
        default: []
    },
    arrayString2: {
        type: [String],
        default: []
    },
    arrayString3: {
        type: [String],
        default: []
    },
    arrayString4: {
        type: [String],
        default: []
    },
    arrayString5: {
        type: [String],
        default: []
    },
    map1: {
        type: Map,
        default: new Map
    },
    map2: {
        type: Map,
        default: new Map
    },
    map3: {
        type: Map,
        default: new Map
    },
    map4: {
        type: Map,
        default: new Map
    },
    map5: {
        type: Map,
        default: new Map
    },
    mapArrayStringNumberByName: {
        type: Map,
        default: new Map
    },
    mapMapNumberByName: {
        type: Map,
        default: new Map
    },
    varibleNames: {
        type: [String],
        default: ['arrayString1', 'arrayString2', 'arrayString3', 'arrayString4', 'arrayString5', 'map1', 'map2', 'map3', 'map4', 'map5']
    },
    // heathIssueIds: {
    //     type: [mongoose.Schema.ObjectId],
    //     default: []
    // }
})
export default mongoose.model('PeeCamp', PeeCampSchema)