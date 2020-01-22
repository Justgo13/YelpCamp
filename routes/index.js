var express = require("express"), 
	passport = require("passport"),
	User = require("../models/user"),
	router  = express.Router();

router.get("/register", function(req, res) {
	res.render("register");
});

router.post("/register", function(req,res){
	var newUser = new User({username: req.body.username})
	User.register(newUser, req.body.password, function(err, user){
		if (err){
			console.log(err);
			req.flash("error", err.message);
			// return res.render("register");
			res.redirect("/register");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success", "Welcome to Yelpcamp " + user.username + "!");
			res.redirect("/campgrounds");
		});
	}); 
});

router.get("/login", function(req, res) {
	res.render("login");
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local",
    {
      successRedirect: "/campgrounds",
      failureRedirect: "/login",
      failureFlash: true,
      successFlash: "Welcome to YelpCamp, " + req.body.username + "!"
    })(req, res);
});

router.get("/logout", function(req, res) {
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/campgrounds");
});

module.exports = router;