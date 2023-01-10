const express = require("express");
const mongoose = require("../db");

const router = express.Router();

const productSchema = new mongoose.Schema(({
  name: String,
  price: String,
  image_url: String,
}))

const Product = mongoose.model("Product", productSchema);

router.get("/getProducts", (req, res)=>{
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

// add all products into database
router.get("/addProducts", (req, res)=>{
  Product.insertMany([
    {
      name: "Mind Wave Stand Stick Marker - Flying Squirrel Sticky Notes",
      price: "435",
      image_url: "https://i.imgur.com/uxzdKzP.png"
    },
    {
      name: "Mind Wave stand stick marker - Lop eared rabbit sticky notes",
      price: "435",
      image_url: "https://i.imgur.com/zMtn7um.png"
    },
    {
      name: "Mind Wave stand stick marker - Shima Enaga sticky notes",
      price: "435",
      image_url: "https://i.imgur.com/LmGHup6.png"
    },
    {
      name: "Mind Wave Holiday Sticky Notes - Amusement Park",
      price: "435",
      image_url: "https://i.imgur.com/GgftIMC.png"
    },
    {
      name: "Mind Wave Stand Stick Marker - Piyokomame Gold Sticky Notes",
      price: "435",
      image_url: "https://i.imgur.com/jiWDAAd.png"
    },
    {
      name: "Mind Wave Holiday Sticky Notes - Camping",
      price: "435",
      image_url: "https://i.imgur.com/mKPntJ5.png"
    },
    {
      name: "Mind Wave Stand Stick Marker - Pallas's Cat Sticky Notes",
      price: "435",
      image_url: "https://i.imgur.com/jdzU5oV.png"
    },
    {
      name: "Mind Wave Stand Stick Marker - Java Sparrow Sticky Notes",
      price: "435",
      image_url: "https://i.imgur.com/tO2OUlQ.png"
    },
    {
      name: "Mind Wave Stand Stick Marker - Shih Tzu Sticky Notes",
      price: "435",
      image_url: "https://i.imgur.com/cBRTcqW.png"
    },
    {
      name: "Mind Wave Stand Stick Marker - Sea Otter Sticky Notes",
      price: "435",
      image_url: "https://i.imgur.com/z8wSGfY.png"
    },
    {
      name: "Mind Wave Stand Stick Marker - Brown Bear Sticky Notes",
      price: "435",
      image_url: "https://i.imgur.com/moH7Nuj.png"
    },
    {
      name: "Mind Wave Stand Stick Marker - White Tiger Sticky Notes",
      price: "435",
      image_url: "https://i.imgur.com/bWeTfSl.png"
    },
  ]).then(function(){
    res.send("Data inserted");  // Success
  }).catch(function(error){
    console.log(error)      // Failure
  })
})


module.exports = router;
