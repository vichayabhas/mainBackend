const  mongoose = require("mongoose");




const PeeCampSchema=new mongoose.Schema({
    campIds:{//camp
        type:[String],
        default:[]
    },
    name:{
        type:String
    }
    

})
module.exports=mongoose.model('NameContainer',PeeCampSchema)