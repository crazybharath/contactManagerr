const express = require("express")
const router = express.Router()
const contact = require("./../models/contacts")
const users = require("../models/user")
const verify=require('../Authorization/auth')

router.get("/allcontacts/:userID", verify,  async (req, res)=>{
    try{
        const allcontacts = await contact.find({ userID: req.params.userID })
        return res.status(200).json({
            contacts : allcontacts
        })
    }catch(e){
        return res.status(400).json({
            message:e.message
        });
    }
})

module.exports = router