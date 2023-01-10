const express = require("express");
const cors = require("cors");
const session = require("express-session");

const passport = require("passport");
require("dotenv").config();

const productRouter = require("./router/product_router");
const userRouter = require("./router/user_router");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));

app.use(express.json());

// if(process.env.NODE_ENV === "production"){
//   app.use(express.static('./client/build'));
// }

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

app.use(productRouter);
app.use(userRouter);


// app.get("*", (req, res)=>{
//   res.sendFile(path.join(__dirname, './client/build', 'index.html'))
// })

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});



