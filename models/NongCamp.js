const  mongoose = require("mongoose");
const Camp = require("./Camp");
const Baan = require("./Baan");



const PeeCampSchema=new mongoose.Schema({
    campId:{
        type:String
    },
    
    baanId:{
        type:String
    }

})
module.exports=mongoose.model('NongCamp',PeeCampSchema)