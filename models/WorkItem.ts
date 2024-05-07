import mongoose from 'mongoose';

const HospitalSchema = new mongoose.Schema({
    name: {
        type: String
    },
    link: {
        type: String
    },
    status: {
        type: String,
        enum: ['not start', 'in process', 'done'],
        default: 'not start'
    },
    partId: {
        type: String
    },
    campId: {
        type: String
    },
    linkOutIds: {//workItem
        type: [String],
        default: []
    },
    fromId: {
        type: String
    }
});
export default mongoose.model('WorkItem', HospitalSchema);