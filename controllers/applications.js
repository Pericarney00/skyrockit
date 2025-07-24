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

//GET route for/new
router.get("/new", async (req, res) => {
  res.render("applications/new.ejs")
})


module.exports = router;