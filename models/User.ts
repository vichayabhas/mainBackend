import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export const buf: string = process.env.JWT_SECECRET || 'asdfjkl;;lkjfdsa'
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    lastname: {
        type: String,
        require: [true, 'Please add a lastname']
    },
    nickname: {
        type: String,
        require: [true, 'Please add a nickname']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        Math: [

            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/



            , 'Please add a valid email'
        ]
    },

    password: {
        type: String,
        required: [true, 'Please add a password']
        ,
        minlength: 6,
        select: false

    },
    tel: {
        type: String,
        unique: true
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    studentId: {//รหัสประจำตัวนิสิต
        type: String,
        default: null,
        unique:true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    shertSize: {
        type: String,
        require: [true, 'Plese choose shert size'],
        enum: ['S', 'M', 'L', 'XL', 'XXL', '3XL']
    },
    helthIsueId: {//helthIsue
        type: mongoose.Schema.ObjectId,
        default: null

    },
    haveBottle: {
        type: Boolean,
        default: false
    },

    mode: {
        type: String,
        enum: ['nong', 'pee'],
        default: 'nong'
    },
    nongCampIds: {//nongCamp
        type: [mongoose.Schema.ObjectId],
        default: []

    },
    peeCampIds: {//peeCamp
        type: [mongoose.Schema.ObjectId],
        default: []

    },
    petoCampIds: {//petoCamp
        type: [mongoose.Schema.ObjectId],
        default: []

    }
    ,
    group: {
        type: String,
        enum: ['A', 'B', 'C', 'Dog', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', null],
        default: null
    },
    role: {
        type: String,
        enum: ['pee', 'nong', 'admin', 'peto'],
        default: 'nong'

    },
    filterIds: {//camp
        type: [mongoose.Schema.ObjectId],
        default: []

    },
    registerIds: {//camp          //nong
        type: [mongoose.Schema.ObjectId],
        default: []

    },
    authorizeIds: {//camp
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    fridayActIds: {//fridayAct
        type: [mongoose.Schema.ObjectId],
        default: []

    },
    fridayActEn: {
        type: Boolean,
        default: false
    },
    fridayAuth: {
        type: Boolean,
        default: false
    },
    likeSongIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    shertManageIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    lostAndFoundIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    linkHash: {
        type: String,
        default: 'null'
    },
    citizenId: {//รหัสประจำตัวประชาชน
        type: String
    },
    likeToSleepAtCamp: {
        type: Boolean
    },
    authPartIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    choiseAnswerIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    quasionIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
});
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
});
export default mongoose.model('User', UserSchema);