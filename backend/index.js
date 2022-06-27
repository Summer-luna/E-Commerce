const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const mongoose = require("mongoose");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

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
  cart: []
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

app.get("/getProducts", (req, res)=>{
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
        console.log(req.body);
        foundUser.cart = req.body;
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
});

/*app.post("/removeItem", (req, res)=>{
  console.log(req.body);
  User.findByIdAndUpdate(req.user.id, { $pull: { cart: { _id: req.body.itemId } } },(err, results)=>{
    if(!err){
      res.json({
        message: "Successfully delete item from cart",
        deleted: true
      })
    }
  })
})*/

app.post("/create-checkout-session", (req, res) => {
  User.findById(req.user.id, async (err, foundUser)=>{
    if(err){
      console.log(err);
    }else {
      if(foundUser){
        let cartItems = foundUser.cart;
        const session = await stripe.checkout.sessions.create({
          line_items: cartItems.map((cartItem) => {
            return {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: cartItem.name
                },
                unit_amount_decimal: cartItem.price
              },
              quantity: cartItem.quantity
            }
          }),
          payment_method_types: ['card'],
          mode: 'payment',
          success_url: 'http://localhost:3000/success',
          cancel_url: 'http://localhost:3000/cart',
          customer_email: foundUser.username,
          billing_address_collection: 'auto',
          shipping_address_collection: {
            allowed_countries: ['US', 'CA'],
          },
        });
        //console.log(session);
        res.json({url: session.url});
      }
    }
  })


})

app.listen(8000, () => {
  console.log("Listening on port 8000!");
});


