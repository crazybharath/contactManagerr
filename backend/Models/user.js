const mongoose = require('mongoose');
const userDetailsSchema=new mongoose.Schema({
    email:{type:String,required:"true",unique:true},
    password:{type:String,required:true},
    //confirmPassword:{type:String,required:true}

},
{
    collection:"userInfo"
}
);
mongoose.model('userInfo', userDetailsSchema);