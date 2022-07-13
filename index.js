const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const mongoose = require("mongoose");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY, {
  apiVersion: '2020-08-27; orders_beta=v4' });
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

app.use( cors());
app.use(express.json());

if(process.env.NODE_ENV === "production"){
  app.use(express.static('./client/build'));
}

app.get("*", (req, res)=>{
  res.sendFile(path.join(__dirname, './client/build', 'index.html'))
})

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
  cart: [],
  order: [],
  googleId: String
});

// adding mongoose plugins
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

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

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8000/auth/google/account",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},function(accessToken, refreshToken, profile, cb){
  User.findOrCreate({googleId: profile.id}, function (err, user){
    return cb(err, user);
  });
}
));

// authentication
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

app.get("/auth/google", passport.authenticate('google', { scope: ['profile'] }));

app.get("/auth/google/account", passport.authenticate('google', {failureRedirect: "http://localhost:3000/login"}),(req, res)=>{
  // successful authentication, response to client
  console.log(res);
  res.redirect("http://localhost:3000");
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

// products
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

// cart
app.post("/addCart", (req, res)=>{
  User.findById(req.user.id, (err, foundUser)=>{
    if(err){
      console.log(err);
    }else {
      if(foundUser){
        //console.log(req.body);
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

// payment checkout
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
          customer_email: foundUser.username,
          payment_method_types: ['card'],
          mode: 'payment',
          success_url: 'https://mern-e-commerce-first-app-1.herokuapp.com/account',
          cancel_url: 'https://mern-e-commerce-first-app-1.herokuapp.com/account/cart',
          billing_address_collection: 'auto',
          shipping_address_collection: {
            allowed_countries: ['US', 'CA'],
          },
        });
        console.log(session);
        foundUser.order.push(session.id);
        foundUser.save();
        res.json({url: session.url});
      }
    }
  });
});

app.get("/getOrders", (req, res)=>{
  User.findById(req.user.id, async (err, foundUser)=>{
    if(err){
      console.log(err);
    }else{
      if(foundUser){
        //const orders = foundUser.order;
        let orders = [];
        for (const order of foundUser.order) {
          const data = await stripe.checkout.sessions.retrieve(order);
          if (data.status === "complete") {
            orders.push({
              orderId: order,
              subtotal: data.amount_subtotal,
              amount_shipping: data.total_details.amount_shipping,
              amount_tax: data.total_details.amount_tax,
              total: data.amount_total,
              customer_email: data.customer_email,
              name: data.customer_details.name,
              shipping_address: data.shipping.address,
            });
            console.log(data);
          }
        }
        //console.log(orders);
        res.json({
          message: "Successful get all user's orders!",
          orders: orders,
        });
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});



