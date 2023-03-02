const express=require('express');
const app=express();
const mongoose=require('mongoose');
app.use(express.json());
const cors = require("cors");
app.use(cors());
const contacts= require("./models/contacts");
const fileupload=require("express-fileupload")
app.use(fileupload());
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

app.post("/upload",async(req,res)=>{
    const {file}=req.files;
    // console.log(file);
    const contact=file.data.toString().split("\r\n");
    // console.log(contacts);
    try{
        for(let i=0;i<contact.length;i++){
            let data=contact[i].split(',');
            const postData=await contacts.create({
                name:data[0],
                designation:data[1],
                company:data[2],
                industry:data[3],
                email:data[4],
                phonenumber:data[5],
                country:data[6]
            })
            console.log(postData);
        }
        res.json({
            status:"sucess",
            result:"uploaded files are stored in database sucessfully"
        })
    }catch(err){
        res.status(400).json({
            status:"failure",
            message:err.message
        })
    }
})

app.delete("/delete",async(req,res)=>{
    const{delId}=(req.body);
    try{
        for(let i=0;i<delId.length;i++){
            const row=await contacts.findOne({_id:delId[i]});
            if(row){
                const delData=await contacts.deleteOne({_id:delId[i]});

            }
        }
        res.json({
            status:true,
            result:"Selected files are deleted"
        })
    }catch(err){
        res.status(400).json({
            status:"failure",
            message:err.message
        })
    }
})

app.listen(port,()=>{
    console.log("server started");
}) 