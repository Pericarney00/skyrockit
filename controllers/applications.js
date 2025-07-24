const express = require("express")
const router = express.Router();

const User = require("../models/user.js")

//We will add our routs

router.get("/", (req, res) => {
  try {
    res.render("applications/index.ejs")
  } catch (error) {
    console.log(error);// keep to read bugs on the back end
    res.redirect("/");
  }
});





module.exports = router;