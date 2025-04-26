
const {sendSMS}=require('./infobipService');
const {otpMap} =require('./otpStore');
const editPhoneNumber=require('./editPhoneNumber');

const sendVerificationCode=async(req,res)=>{
    const {phoneNumber}=req.body;
    if(!phoneNumber){
        return res.status(400).json({error:'Phone number is required'});
    }
    // Validate the phone number format
    editPhoneNumber(phoneNumber);
    console.log(editPhoneNumber(phoneNumber));
    const verificationCode=Math.floor(1000+Math.random()*9000).toString();
    try {
        const message=`Your verification code is ${verificationCode}`;
        const expiresAt=Date.now()+ 10*60*1000; // 10 minutes expiration time
        await sendSMS(editPhoneNumber(phoneNumber),message);
        // Store the code and expiration time in the otpMap
        otpMap.set(editPhoneNumber(phoneNumber),{code:verificationCode,expiresAt});
        //console.log('Verification code sent:',verificationCode,'to',editPhoneNumber(phoneNumber));
        return res.status(200).json({message:'Verification code sent successfully'});
    }catch(error){
        return res.status(500).json({error:'Failed to send verification code'});
    }
}
module.exports={sendVerificationCode};