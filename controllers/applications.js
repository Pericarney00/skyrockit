const express = require("express")
const router = express.Router();

const User = require("../models/user.js")

//We will add our routs

router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)

    res.render("applications/index.ejs", {
      applications: currentUser.applications
    });
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

//GET to application /applications/:applicationId
router.get("/:applicationId", async  (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)

    const application = currentUser.applications.id(req.params.applicationId)

    res.render("applications/show.ejs", {
      application: application,
    })

  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
  
});

// DELETE /applications/:appl"icationId
router.delete("/:applicationId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)

    currentUser.applications.id(req.params.applicationId).deleteOne()
    await currentUser.save()

    res.redirect(`/users/${currentUser._id}/applications`)
  } catch(error) {
    console.log(error);
    res.redirect("/");
  } 
})


router.get("/:applicationId/edit", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    const application = currentUser.applications.id(req.params.applicationId)

    res.render("applications/edit.ejs", {
      application: application,
    })
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
})

router.put("/:applicationId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)

    const application = currentUser.applications.id(req.params.applicationId)

    application.set(req.body)

    await currentUser.save()

    res.redirect(`/users/${currentUser._id}/applications/${req.params.applicationId}`)
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
})
module.exports = router;