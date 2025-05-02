const jwt=require('jsonwebtoken');

const verifyJwt=(req,res,next)=>{
    // Get the access token from the request headers
        const authHeader = req.headers['authorization'];
      
        // Token format: "Bearer <token>"
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
          return res.status(401).json({ message: 'Access token missing' });
        }
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err)return res.status(403).json({message:'Invalid  access token'});// Invalid token
            console.log("user Access valid ");
            req.user = {
                username:decoded.username,
                id:decoded.userID,
 
            };
            next();
        }
    );
}

module.exports=verifyJwt;