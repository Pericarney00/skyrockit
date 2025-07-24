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

//POST for /applications
router.post("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);

    currentUser.applications.push(req.body);

    await currentUser.save();

    res.redirect(`/users/${currentUser._id}/applications`)
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});





module.exports = router;