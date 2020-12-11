const users = require("../models/usersModel");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await users.findOne({ email: email });
    if (user == null) {
      return res.status(404).json("user not found");
    } else {
      const passwordCorrect = await bcrypt.compare(password, user.password);
      if (passwordCorrect) {
        req.session.loggedIn = true;
        req.session.user = user;
        return res.status(200).json("login successful");
      } else {
        return res.status(401).json("incorrect password");
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
