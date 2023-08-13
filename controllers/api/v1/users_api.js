const Users = require("../../../models/users");
const jwt = require("jsonwebtoken");

module.exports.signUp = async function (req, res) {
  //
  try {
    const existingUser = await Users.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "An account with your email already exists !!",
        user: existingUser,
      });
    }

    const user = await Users.create(req.body);
    return res.status(200).json({
      success: true,
      message: "Account successfully created!",
      user: user,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports.createSession = async function (req, res) {
  try {
    let user = await Users.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.status(422).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sign in successful, here is your token please keep it safe",
      data: {
        token: jwt.sign(user.toJSON(), "api", { expiresIn: "100000000" }),
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
