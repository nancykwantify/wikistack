const express = require("express");
const router = express.Router();
const { addPage } = require("../views");
const { Page } = require("../models");

router.get("/", (req, res, next) => {
  res.send("got to GET /wiki/");
});

router.post("/", async (req, res, next) => {
  try {
    const page = await Page.create({
      title: "testing",
      content: "testing content",
    });

    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.get("/", (req, res, next) => {
  res.send("got to GET /wiki/add");
});

router.get("/add", (req, res) => {
  res.send(addPage());
  // res.json(req.body);
});

Page.beforeValidate((title) => {
  title.replace(/\s+/g, "_").replace(/\W/g, "");
});

module.exports = router;

// router.get("/", function(req, res, next){
//   try{
//     console.log("stesting")
//   }catch(err){
//     console.error(err);
//   }
// })
