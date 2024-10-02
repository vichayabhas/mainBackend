import mongoose from "mongoose"
import { typeChats } from "./interface"
const PeeCampSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    campModelId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    role: {
        type: String,
        enum: ['pee', 'peto', 'nong'],
        required: true
    },
    typeChat: {
        type: String,
        enum: typeChats,
        required: true
    },
    refId: {
        type: mongoose.Schema.ObjectId,
        required: true
        //'น้องคุยส่วนตัวกับพี่'shertMasnage,'คุยกันในบ้าน'baan,'คุยกันในฝ่าย'part,'พี่คุยกันในบ้าน'baan,'พี่บ้านคุยกัน'part
    },
    campMemberCardIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    date: {
        type: Date,
        default: new Date(Date.now()),
    }
})
export default mongoose.model('Chat', PeeCampSchema)