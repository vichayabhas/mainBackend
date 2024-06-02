import mongoose from "mongoose";
const PeeCampSchema = new mongoose.Schema({
    name:{
        type:String
    },
    heltfIsueIds:{
        type:[mongoose.Schema.ObjectId],
        default:[]
    }
    
})
export default mongoose.model('Food', PeeCampSchema)