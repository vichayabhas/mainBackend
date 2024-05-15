import mongoose from "mongoose";
const PeeCampSchema = new mongoose.Schema({
    name:{
        type:String
    },
    heltfIsueIds:{
        type:[String],
        default:[]
    }
    
})
export default mongoose.model('Food', PeeCampSchema)