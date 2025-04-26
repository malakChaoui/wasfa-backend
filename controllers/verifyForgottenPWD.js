const User=require('../model/User');
const {otpMap}=require('./otpStore');
const editPhoneNumber=require('./editPhoneNumber');

const verifyForgottenOTP= async(req,res)=>{
    const { code ,phonenumber } =req.body;
    if(!code || !phonenumber) return res.status(400).json({'message':'code and numberphone are required'});
    try{
        // Validate the phone number format 
        const phone= editPhoneNumber(phonenumber);
        //checking if the user existed 
        const exist= await User.findOne({phoneNumber:phone}).exec();
        if(!exist) return res.status(400).json({'message':'No user with this number'});
       // vrifying code
       const record=otpMap.get(phone);
       if(!record)return res.status(400).json({error:' No code found for this number'});
       if(Date.now()>record.expiresAt){
       otpMap.delete(phone);
        return res.status(400).json({error:'Code expired'});
       }
       if(record.code !== code){
        return res.status(400).json({error:'Invalid code'});
       }
       res.status(200).json({message:'Code verified successfully'});
       // Delete the code from the otpMap after successful verification
       otpMap.delete(phone);
    }catch(error){
        console.error('code verification failed',error.message);
        res.status(401).json({ error:'Invalid code entred'});
    }

}
module.exports={verifyForgottenOTP}