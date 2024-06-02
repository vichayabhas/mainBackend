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
        type: mongoose.Schema.ObjectId
    },
    campId: {
        type: mongoose.Schema.ObjectId
    },
    linkOutIds: {//workItem
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    fromId: {
        type: mongoose.Schema.ObjectId
    },
    createBy:{
        type:mongoose.Schema.ObjectId
    }
});
export default mongoose.model('WorkItem', HospitalSchema);