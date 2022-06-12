const express = require('express');
const cors = require('cors');
/* const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const expressSession = require('express-session'); */

const app = express();
app.use(cors());
app.use(express.json());

//app.use(express.json());

app.post("/signup", (req, res)=>{
  
  const data = {
    email: req.body.email,
    password: req.body.password
  }
  
  console.log(data);
  res.send("successfully saved!")
})

app.get("/", (req, res)=>{
  res.send("Home Page");
})

app.listen(8000, ()=>{
  console.log("Listening on port 8000!");
})
