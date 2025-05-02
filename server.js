require('dotenv').config();
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const connectDB=require('./config/connectDB');
const PORT= process.env.PORT || 3700;



//connect to mongoDB
connectDB();

//buitt-in middleware to handle urlencoded data
// in other words , form data
//content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({extended:false}));

//built-in middleware for json
app.use(express.json());

//apload routes
app.use('/verifyCode',require('./routes/verify'));
app.use('/registerNewUser',require('./routes/register'));
app.use('/login',require('./routes/login'));
app.use('/refresh',require('./routes/refresh'));
app.use('/logout',require('./routes/logout'));
app.use('/addPost',require('./routes/addpost'));
app.use('/addpfp',require('./routes/adduserpfp'));
app.use('/sendCode',require('./routes/sendCode'));
app.use('/getSuggestions',require('./routes/suggest'));
app.use('/save-new-pwd',require('./routes/forgotchangepassword'));
app.use('/verify-to-changepwd',require('./routes/verifyForgottenPWD'));
app.use('/getPosts',require('./routes/getPostes'));
app.use('/get-me',require('./routes/Getme'));
mongoose.connection.once('open',()=>{
    console.log('connected to mongoDB');
    app.listen(PORT,()=>console.log(`server running on port ${PORT}`));
});