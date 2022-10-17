const User = require("./../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(200).json({
      status: "ok",
      message: "user successfully created !",
      data: {
        user,
      },
    });
  } catch (err) {
    res.json({
      status: "fail",
      message: err.message,
      error: err.errors,
    });
  }
};

exports.updateMe = async (req, res) => {
  try {
    if (!req.currentUser) throw new Error("please login !");
    const user = await User.findById(req.currentUser.id);

    if (!user) throw new Error("something went wrong....");
    if (req.body.name) user.name = req.body.name;
    if (req.body.checked) user.darkMode = true;
    else if (!req.body.checked) user.darkMode = false;
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "ok",
      message: "successfully updated profile",
    });
  } catch (err) {
    res.json({
      status: "fail...",
      message: err.message,
    });
  }
};
