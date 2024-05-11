import mongoose from "mongoose";

export default mongoose.model('Size',new mongoose.Schema({
    sizeS:{
        type:Number
    },
    sizeM:{
        type:Number
    },
    sizeL:{
        type:Number
    },
    sizeXL:{
        type:Number
    },
    sizeXXL:{
        type:Number
    },
    size3XL:{
        type:Number
    }
}))