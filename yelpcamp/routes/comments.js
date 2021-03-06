const express = require("express"),
      router = express.Router({mergeParams: true}),
      Campground = require("../models/campground"),
      Comment = require("../models/comment"),
      middleware = require("../middleware");

router.get("/new", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
       if (err) {
           console.log(err);
       } else {
           res.render("comments/new", { campground });
       }
    });
});
 
router.post("/", middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            req.flash("error", "Something went wrong!")
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

router.get("/:comments_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comments_id, (err, comment) => {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", { comment, campground_id: req.params.id });
        }
    })
});

router.put("/:comments_id/", (req, res) => {
   Comment.findByIdAndUpdate(req.params.comments_id, req.body.comment, (err) => {
      if (err) {
          res.redirect("back");
      }  else {
          res.redirect("/campgrounds/" + req.params.id )
      }
   });
});


//Delete
router.delete("/:comments_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comments_id, (err) => {
        err ? res.redirect("back") : res.redirect("/campgrounds/" + req.params.id );
    });
});

module.exports = router;