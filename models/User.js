const mongoose=require('mongoose');
const bcrypt =require('bcrypt');

const jwt= require('jsonwebtoken');



const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name']
    },
    lastname:{
        type:String,
        require:[true,'Please add a lastname']
    },
    nickname:{
        type:String,
        require:[true,'Please add a nickname']
    }, 
    email:{
        type:String,
        required:[true,'Please add an email'],
        unique: true,
        Math: [
            
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            


            ,'Please add a valid email'
        ]
    },
    
    password: {
        type:String,
        required:[true,'Please add a password']
        ,
        minlength: 6,
        select: false

    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    studentId:{//รหัสประจำตัวนิสิต
        type:String,
        default:null
    },
    gender:{
        type:String,
        enum:['Male','Female']
    },
    shertSize:{
        type:String,
        require:[true,'Plese choose shert size'],
        enum:['S','M','L','XL','XXL','3XL']
    },
    helthIsueId:{//helthIsue
        type:String,
        default:null

    },
    haveBottle:{
        type:Boolean,
        default:false
    },

    mode:{
        type:String,
        enum: ['nong','pee'],
        default: 'nong'
    },
    nongCampIds:{//nongCamp
        type:[String],
        default: []

    },
    peeCampIds:{//peeCamp
        type:[String]  ,
        default:[]

    },
    petoCampIds:{//petoCamp
        type:[String]  ,
        default:[]

    }
    ,
    group:{
        type:String,
        enum:['A','B','C','Dog','E','F','G','H','J','K','L','M','N','P','Q','R','S','T',null],
        default:null
    },
    role:{
        type:String,
        enum:['pee','nong','admin','peto'],
        default:'nong'

    },
    filterIds:{//camp
        type:[String],
        default:[]
        
    },
    registerIds:{//camp          //nong
        type:[String], 
        default:[]

    }, 
    authorizeIds:{//camp
        type:[String],
        default:[]

    },
    fridayActIds:{//fridayAct
        type:[String],
        default:[]

    },
    fridayActEn:{
        type:Boolean,
        default:false
    },
    fridayAuth:{
        type:Boolean,
        default:false
    },
    likeSongIds:{
        type:[String],
        default:[]
    },
    shertManageIds:{
        type:[String],
        default:[]
    },

    
    createdAt:{
        type:Date,
        default:Date.now
    }
});

UserSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
});
UserSchema.methods.getSignedJwtToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    });
}
UserSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
module.exports=mongoose.model('User',UserSchema);