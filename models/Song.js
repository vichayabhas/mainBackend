const { default: mongoose } = require("mongoose");



const PartSchema=new mongoose.Schema({
    name:{
        type:String
    },
    campIds:{//camp
        type:[String],
        default:[]
    },
    baanIds:{//baan
        type:[String],
        default:[]
    },
    auther:{
        type:String
    },
    time:{
        type:TimeRanges
    },
    link:{
        type:String
    },
    userLikeIds:{
        type:[String],
        default:[]
    }

   
})
module.exports=mongoose.model('Song',PartSchema)