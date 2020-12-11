const users = require("../models/usersModel");

module.exports = async (req, res) => {
  try {
    const allUsers = await users.find({}, "email name");
    if (allUsers == null) {
      return res.status(404).json("No users registered Yet");
    } else {
      return res.status(200).json(allUsers);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
