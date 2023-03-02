const express=require('express');
const app=express();
const mongoose=require('mongoose');
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const JWT_SECRET="BandaruAvinash";
const mongoUrl=`mongodb+srv://Avinash:Avinash@cluster0.fxwpvxc.mongodb.net/?retryWrites=true&w=majority`;
port=process.env.PORT||5000;
mongoose.set('strictQuery', true)
mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
})
.then(()=>{
    console.log("Connected to database");
})
.catch((e)=>console.log(e));
require('./models/usersSchema');
const User=mongoose.model("userInfo");
app.post("/register",async(req,res)=>{
    const {email,password,confirmPassword}=req.body;
    const enycryptedPassword=await bcrypt.hash(password,10)
    try{
        const oldUser= await User.findOne({email})
        if(oldUser){
           return res.send({error:"user exixts"})
        }
        await User.create({
            email,
            password:enycryptedPassword,
        });
        res.send({status:"ok"})
    }
    catch(eror){
        res.send({status: 'error'});
    }
})
app.post("/login-user", async(req, res) => {
    const {email, password} = req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.json({error: 'user not found'});
    }
    if(await bcrypt.compare(password, user.password)){
        const token=jwt.sign({},JWT_SECRET);
        if(res.status(201)){
            return res.json({status: 'ok',data: token});
        }
        else{
            return  res.json({error:"error"})
        }
    }
    res.json({status: 'error',error:"Invalid Password"});
})
app.listen(port,()=>{
    console.log("server started");
}) 