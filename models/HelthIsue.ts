import mongoose from "mongoose";
const PeeCampSchema = new mongoose.Schema({
    userId: {//user
        type: mongoose.Schema.ObjectId
    },
    foodIds:{
        type:[mongoose.Schema.ObjectId],
        default:[]
    },
    chronicDiseaseIds:{
        type:[mongoose.Schema.ObjectId],
        default:[]
    },
    medicineIds:{
        type:[mongoose.Schema.ObjectId],
        default:[]
    },
    isWearing:{
        type:Boolean,
        default:false
    }
})
export default mongoose.model('HelthIsue', PeeCampSchema)