const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: {type: String}, 
    designation: String,
    company: String,
    industry:String,
    email:String,
    phonenumber:String,
    country:String,
    userID:String,
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    }
  });
  const contacts= mongoose.model("contacts", contactSchema, "contacts");

  module.exports= contacts