const mongoose  = require("mongoose");
const { startSize } = require("../controllers/setup");



const BaanSchema= new mongoose.Schema({
    name:{
        type:String
    },
    fullName:{
        type:String
    },
    campId:{//camp
        type:String
    },
    peeIds:{//user
        type:[String],
        default:[]
    },
    nongIds:{//user
        type:[String],
        default:[]
    },
    nongHelthIsueIds:{//helth
        type:[String],
        default:[]
    },
    peeHelthIsueIds:{//helth
        type:[String],
        default:[]
    },
    nongShertSize:{// size    count
        type:Map,
        default:startSize
    },
    peeShertSize:{// size    count
        type:Map,
        default:startSize
    },
    songIds:{
        type:[String],
        default:[]
    },
    nongHaveBottle:{
        type:Number,
        default:0
    },
    peeHaveBottle:{
        type:Number,
        default:0
    },
    nongHaveBottleMapIds:{
        type:Map,
        default:new Map
    },
    peeHaveBottleMapIds:{
        type:Map,
        default:new Map
    },
    mapPeeCampIdByPartId:{
        type:Map,
        default:new Map
    },
    peeModelIds:{
        type:[String],
        default:[]
    },
    nongModelId:{
        type:String
    },
    mapPeeCampIdByPartId:{
        type:Map,
        default:new Map
    },
    nongShertManageIds:{
        type:[String],
        default:[]
    },
    peeShertManageIds:{
        type:[String],
        default:[]
    },
   
    
   
})
module.exports=mongoose.model('Baan',BaanSchema)