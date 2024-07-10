import mongoose from "mongoose";
const PeeCampSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId
    },
    quasionId:{
        type:mongoose.Schema.ObjectId
    },
    campId:{
        type:mongoose.Schema.ObjectId
    },
    answer:{
        type:String,
        enum:['A','B','C','D','E',null],
        default:null
    },
    score:{
        type:Number,
        default:0
    },
    correct:{
        type:String,
        enum:['A','B','C','D','E']
    }
})
export default mongoose.model('ChoiseAnswer', PeeCampSchema)