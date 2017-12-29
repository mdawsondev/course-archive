const bodyParser     = require("body-parser"),
      express        = require("express"),
      mongoose       = require("mongoose"),
      app            = express(),
      flash          = require("connect-flash"),
      passport       = require("passport"),
      LocalStrategy  = require("passport-local"),
      methodOverride = require("method-override"),
      Campground     = require("./models/campground"),
      Comment        = require("./models/comment"),
      User           = require("./models/user"), 
      seedDB         = require("./seeds");
      
const indexRoutes      = require("./routes/index"),
      campgroundRoutes = require("./routes/campgrounds"),
      commentRoutes    = require("./routes/comments");

mongoose.connect(`mongodb://localhost/yelpcamp`, { useMongoClient: true });
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(flash());

//seedDB();

// =========================
// PASSPORT CONFIGURATION
// =========================

app.use(require("express-session")({
    secret: "Something secret, something safe.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use( (req, res, next) => {
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes)
app.use("/campgrounds/:id/comments", commentRoutes);
 
app.listen(process.env.PORT, process.env.IP, () => {
    console.log("YelpCamp server started.");
});