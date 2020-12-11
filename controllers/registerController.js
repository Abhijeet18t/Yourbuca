const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const users = require("../models/usersModel");
module.exports = async (req, res) => {
  try {
    email = req.body.email;

    //unique email validation
    const findEmail = await users.findOne({ email: email });

    if (findEmail) {
      return res.status(403).json("email already exists");
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const usersModal = new users({
        _id: mongoose.Types.ObjectId(),
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        DOB: req.body.DOB,
        password: hashedPassword,
      });
      usersModal.save();
      res.status(200).json("Registered successfully");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
