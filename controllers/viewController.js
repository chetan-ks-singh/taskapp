const Task = require("./../models/taskModel");
const User = require("./../models/userModel");
const express = require("express");

exports.getSignUpPage = async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getLoginPage = async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getUserDashboard = async (req, res) => {
  try {
    if (!req.currentUser) throw new Error("please login");

    const tasks = await Task.find({ user: req.currentUser._id });

    res.render("dashboard", {
      tasks,
    });
  } catch (err) {
    res.json({
      status: "fail..",
      message: err.message,
    });
  }
};

exports.checkForDarkMode = async (req, res, next) => {
  try {
    if (!req.currentUser) throw new Error("please login");
    const user = await User.findById(req.currentUser._id);
    if (!user) throw new Error("please login");
    res.locals.user = user;
    if (user.darkMode) {
      res.locals.darkMode = true;
      return next();
    }
    return next();
  } catch (err) {
    res.json({
      status: "fail",
      message: err.message,
    });
  }
};
