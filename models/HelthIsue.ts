import mongoose from "mongoose";
const PeeCampSchema = new mongoose.Schema({
    userId: {//user
        type: String
    },
    foodIds:{
        type:[String],
        default:[]
    },
    chronicDiseaseIds:{
        type:[String],
        default:[]
    },
    medicineIds:{
        type:[String],
        default:[]
    },
    isWearing:{
        type:Boolean,
        default:false
    }
})
export default mongoose.model('HelthIsue', PeeCampSchema)