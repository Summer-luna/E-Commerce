const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors({
    credentials: true
}));
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// configure session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// middleware
app.use(passport.initialize());
app.use(passport.session());

// connect to mongoDB
mongoose.connect(process.env.MONGOOSE_URI);

// mongoose schema
const userSchema = new mongoose.Schema({
  username: String,
  passport: String,
});

// adding mongoose plugins
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

// configure passport local strategy
passport.use(User.createStrategy());

// passport session support
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.post("/signup", (req, res) => {
  User.register(
    { username: req.body.username },
    req.body.password,
    (err, user) => {
      if (err) {
        res.send(err);
      } else {
        passport.authenticate("local")(req, res, () => {
            res.send("successfully!");
        });
      }
    }
  );
});

app.post("/login", (req, res)=>{
    const user = new User({
        username: req.body.username,
        passport: req.body.password
    })

    req.login(user, (err)=>{
        if(err){
            res.send(err);
        }else{
            passport.authenticate("local")(req, res, ()=>{
                res.send("successfully!");
            })
        }
    })
});

app.listen(8000, () => {
  console.log("Listening on port 8000!");
});


