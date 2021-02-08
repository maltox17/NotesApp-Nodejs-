const user = require("../models/user");
const passport = require("passport");

const userCtrl = {};

userCtrl.renderSignUpForm = (req, res) => {
  res.render("users/signup");
};

userCtrl.signUp = async (req, res) => {
  const errors = [];

  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Password do not match" });
  }
  if (password.lenght < 6) {
    errors.push({ text: "Passwords must be at least 6 characters." });
  }
  if (errors.lenght > 0) {
    res.render("users/signup", {
      errors,
      name,
      email,
    });
  } else {
    const emailUser = await user.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "the email is already in use");
      res.redirect("/users/signup");
    } else {
      const newUser = new user({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "You are registered");
      res.redirect("/users/signin");
    }
  }
};

userCtrl.renderSignin = (req, res) => {
  res.render("users/signin");
};

userCtrl.signin = passport.authenticate("local", {
  failureRedirect: "/users/signin",
  successRedirect: "/notes",
  failureFlash: true,
});

userCtrl.logout = (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out now');
  res.redirect('/users/signin');
};

module.exports = userCtrl;
