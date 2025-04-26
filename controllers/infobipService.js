const axios=require('axios');
require('dotenv').config();


const sendSMS=async(phoneNumber,message)=>{
    const url=`${process.env.INFOBIP_BASE_URL}/sms/2/text/advanced`;
    const payload={
        messages:[
            {
                destinations:[{to:phoneNumber}],
                from:process.env.INFOBIP_SENDER,
                text:message,
            }
        ]
    };
    try {
        const response=await axios.post(url,payload,{
            headers:{
                Authorization:`App ${process.env.INFOBIP_API_KEY}`,
                'Content-Type':'application/json',
                Accept:'application/json',
            },
        });
        //console.log("Infobip URL:", url);
        console.log('SMS sent response:', JSON.stringify(response.data, null, 2));
        return response.data;
    }catch(error){
        console.error('Error sending SMS:',error.response?.data || error.message );
        throw error;
    }
};
module.exports={sendSMS};