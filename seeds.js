const mongoose = require("mongoose"),
      Campground = require("./models/campground"),
      Comment = require("./models/comment");
      
const data = [
    {
        name: "Cloud's Rest",
        image: "http://rivista-cdn.hvmag.com//images/cache/cache_a/cache_5/cache_f/Fotolia_57091173_Subscription_Monthly_XXL-7288cf5a.jpeg?ver=1505326857&aspectratio=1.5009380863039",
        detail: "Blah blah blah."
    },
    {
        name: "Not Cloud's Rest",
        image: "http://rivista-cdn.hvmag.com//images/cache/cache_a/cache_5/cache_f/Fotolia_57091173_Subscription_Monthly_XXL-7288cf5a.jpeg?ver=1505326857&aspectratio=1.5009380863039",
        detail: "Blah blah blah."
    },
    {
        name: "Carl's Rest",
        image: "http://rivista-cdn.hvmag.com//images/cache/cache_a/cache_5/cache_f/Fotolia_57091173_Subscription_Monthly_XXL-7288cf5a.jpeg?ver=1505326857&aspectratio=1.5009380863039",
        detail: "Blah blah blah."
    }
]
     
function seedDB() {
    // Remove all campgrounds.
    Campground.remove({}, function(err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed campgrounds.");
        // Add a few campgrounds.
        data.forEach(function(seed) {
           Campground.create(seed, function(err, campground){
               if (err) {
                   console.log(err);
               } else {
                   console.log("Added campground.");
                   // Create a comment.
                   Comment.create(
                       {
                           text: "This place is great!",
                           author: "Homer"
                       }, function(err, comment) {
                           if (err) {
                               console.log(err);
                           } else {
                               campground.comments.push(comment);
                               campground.save();
                               console.log("Created new comment.");
                           }
                       });
               }
           }) 
        });
    });
    
    // Add a few comments.
}

module.exports = seedDB;