const jwt=require('jsonwebtoken');

const verifyJwt=(req,res,next)=>{
    const {accessToken}=req.body;
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err)return res.sendStatus(403);// Invalid token
            console.log("user Access valid ");
            req.user = {
                username:decoded.username,
                id:decoded.userID,
 
            };
            next();
        }
    );
}

module.exports={verifyJwt};