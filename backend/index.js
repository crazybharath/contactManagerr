const express = require("express");
const conn = require("./connection/conn");
const cors = require("cors");
const registerRoute = require("./routes/register");
const logInRoute = require('./routes/Login')
const allcontact = require("./routes/getAllContacts")
const searchByEmail = require("./routes/searchByEmail")
const app = express();
let port =process.env.PORT ||  5050;
conn();
app.use(cors());
app.use(registerRoute);
app.use(logInRoute)
app.use(allcontact)
app.use(searchByEmail)
app.use('/',(req,res)=>{
    res.send('working fine')
})
app.listen(port, () => console.log(`app running on port ${port}`));



