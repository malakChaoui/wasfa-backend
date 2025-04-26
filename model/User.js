const mongoose=require('mongoose');
const Schema =mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        trim: true //delete space at the begin, in the end
    },
    password:{
        type:String,
        required:true
    },
    certificatURL:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: String,
        required: true,
        unique: true
    },
    latitude:{
        type: Number,
        required: true,
    },
    langitude:{
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    pfpURL:{
        type: String,
    },
    savedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    refreshToken:String
},{ timestamps: true });// create at : //update at:

module.exports=mongoose.model('User',userSchema);