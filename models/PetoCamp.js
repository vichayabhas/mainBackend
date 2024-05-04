const  mongoose = require("mongoose");




const PeeCampSchema=new mongoose.Schema({
    campId:{
        type:String
    },
    partId:{
        type:String
    },
  
})
module.exports=mongoose.model('PetoCamp',PeeCampSchema)