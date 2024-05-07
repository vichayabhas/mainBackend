import mongoose from "mongoose";
const PeeCampSchema = new mongoose.Schema({
    userId: {//user
        type: String
    }
})
export default mongoose.model('HelthIsue', PeeCampSchema)