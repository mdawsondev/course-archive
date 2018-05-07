const express = require("express"),
      router = express.Router(),
      Campground = require("../models/campground"),
      middleware = require("../middleware");
      
router.get("/", (req, res) => {
    Campground.find({}, (err, campgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds }); 
        }
    });
});

router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
       if (err) {
           console.log(err);
       } else {
           res.render("campgrounds/show", { campground });
       }
    });
});

//Edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        res.render("campgrounds/edit", { campground });
    });
}); 

//Update
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        err ? res.redirect("/campgrounds") : res.redirect("/campgrounds/" + req.params.id);
    });
});

//Delete
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        err ? res.redirect("/campgrounds") : res.redirect("/campgrounds/");
    });
});

//Create
router.post("/", middleware.isLoggedIn, (req, res) => {
    let name = req.body.name,
        price = req.body.price,
        image = req.body.image,
        detail = req.body.detail,
        author = {
            id: req.user._id,
            username: req.user.username
        },
        newCampground = { name, image, detail, author, price };

    Campground.create(newCampground, (err, item) => {
        if(err) {
            console.log("Something went wrong in the database!");
        } else {
            console.log(`We just added a new item! \n${item}`);
        }
    });

    res.redirect("/campgrounds");
});


module.exports = router;