import mongoose from "mongoose";
const LostAndFoundSchema=new mongoose.Schema({
    campId:{
        type:String
    },
    type:{
        type:String,
        enum:['lost','found']
    },
    name:{
        type:String
    },
    detail:{
        type:String
    },
    userId:{
        type:String
    },
    placeId:{
        type:String
    },
    buildingId:{
        type:String
    }
})
export default mongoose.model('LostAndFound',LostAndFoundSchema)