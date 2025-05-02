const mongoose=require('mongoose');
const Schema =mongoose.Schema;

const postSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    medication:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true,
    },
    expiryDate:{
        type: Date,
        required: true,
    },
    note:{
        type: String,
    },
    imageURL:{
        type: String,
        required: true,
    },
    location:{
        type:{type: String, enum:['Point'],required:true},
        coordinates:{ type:[Number],
        required: true    
        }
    },
    address:{
        type: String,
        required: true,
    }
},{ timestamps: true });// create at : //update at:
postSchema.index({location:'2dsphere'});

module.exports=mongoose.model('Post',postSchema);