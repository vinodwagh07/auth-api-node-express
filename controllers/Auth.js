const { mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.signup = async(req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    let hashPassword;

    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: "Error while creating hashed password"
        })
    }

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    return res.status(201).json({
        success:true,
        data: user,
        message: "user created successfully",
    })
  } catch (error) {
    console.log(error)
    return res.json({
        success: false,
        message: "User can't be registered. Please try again later.!!!"
    })
  }
};
