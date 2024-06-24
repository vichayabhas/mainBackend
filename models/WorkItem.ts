import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const HospitalSchema = new mongoose.Schema({
    name: {
        type: String
    },
    link: {
        type: String,
        default:null
    },
    status: {
        type: String,
        enum: ['not start', 'in process', 'done'],
        default: 'not start'
    },
    partId: {
        type: mongoose.Schema.ObjectId,
        required:[true]
    },
    linkOutIds: {//workItem
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    fromId: {
        type: mongoose.Schema.ObjectId,
        default:null
    },
    createBy:{
        type:mongoose.Schema.ObjectId
    },
    password:{
        type:String,
        required:[true,''],
        minlength: 2,
        
    },
    partName:{
        type:String
    }
});
HospitalSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
});
export default mongoose.model('WorkItem', HospitalSchema);