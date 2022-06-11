const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const expressSession = require('express-session');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.listen(8080, ()=>{
  console.log("Listening on port 8080!");
})

