const express = require("express");
const router = express.Router();
const {addPage} = require("../views");

router.get ("/", (req, res, next) => {
  res.send("got to GET /wiki/");
})

router.post("/", (req, res, next) => {
  res.send("got to POST /wiki/");
})

router.get ("/", (req, res, next) => {
  res.send("got to GET /wiki/add");
})

router.get("/add", (req,res) => {
    res.send(addPage());
  })

module.exports = router;


// router.get("/", function(req, res, next){
//   try{
//     console.log("stesting")
//   }catch(err){
//     console.error(err);
//   }
// })
