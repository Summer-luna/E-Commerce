const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const mongoose = require("mongoose");
const {next} = require("lodash/seq");
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
const productSchema = new mongoose.Schema(({
  name: String,
  price: String,
  image: [String],
  category: String
}))

const userSchema = new mongoose.Schema({
  username: String,
  passport: String,
  cart: [productSchema]
});

// adding mongoose plugins
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);
const Product = mongoose.model("Product", productSchema);

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
          res.json({
            message: "You're signed up!",
            auth: true
          });
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
          console.log(err);
        }else{
            passport.authenticate("local")(req, res, ()=>{
                res.json({
                  message: "You're signed in!",
                  auth: true
                })
            });
        }
    });
});

app.post("/logout", (req, res)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }else {
      res.json({
        message: "You've logged out!",
        auth: false
      });
    }
  });
});

app.get("/checkAuth", (req, res)=>{
  if(req.isAuthenticated()){
    return res.json({
      message: "You're signed in!",
      auth: true
    })
  }

  return res.json({
    message: "You're not signed in!",
    auth: false
  })
})

app.get("/products", (req, res)=>{
  Product.find((err, foundProduct)=>{
    if(err){
      console.log(err);
    }else {
      if(foundProduct){
        res.json(foundProduct);
      }
    }
  });
})

app.post("/addCart", (req, res)=>{
  User.findById(req.user.id, (err, foundUser)=>{
    if(err){
      console.log(err);
    }else {
      if(foundUser){
        foundUser.cart.push(req.body);
        foundUser.save();
        res.json({
          message: "Successfully added to cart.",
          isAdded: true
        })
      }else {
        res.json({
          message: "Failure added to cart.",
          isAdded: false
        })
      }
    }
  });
});

app.get("/getCart", (req, res)=> {
  User.findById(req.user.id, (err, foundUser)=>{
    if(err){
      console.log(err);
    }else {
      if(foundUser){
        res.json({
          message: "Successfully get cart data!",
          data: foundUser.cart
        });
      }else {
        res.json({
          message: "Failure get cart data!"
        });
      }
    }
  })
})

app.listen(8000, () => {
  console.log("Listening on port 8000!");
});


