const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const session = require('express-session');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// TODO: session, passport-local strategy
// configure session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))

// middleware
app.use(passport.initialize());
app.use(session());

// connect to mongoDB
mongoose.connect(process.env.MONGOOSE_URI);

// mongoose schema
const userSchema = new mongoose.Schema({
  email: String,
  passport: String
})

// adding mongoose plugins
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', userSchema);

// configure passport local strategy
passport.use(User.createStrategy());

// passport session support
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.post("/signup", (req, res)=>{
  
  const data = {
    email: req.body.email,
    password: req.body.password
  }

  User.register({username: data.email}, data.password, (err, user)=>{
    if(err) {
      console.log(err);
      res.redirect("http://localhost:3000/signup")
    }else{
      passport.authenticate('local', (req, res)=>{
        res.redirect("http://localhost:3000")
      })
    }
  })

  res.send("successfully saved!")
})

app.listen(8000, ()=>{
  console.log("Listening on port 8000!");
})


