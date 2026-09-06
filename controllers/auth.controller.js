const bcrypt = require("bcryptjs");
const fs = require("fs");
const User = require("../models/User.model");
const getImageFileType = require("../utils/getImageFileType");

exports.register = async (req, res) => {
  try {
    const { login, password, phone } = req.body;

    const imageFileType = req.file
      ? await getImageFileType(req.file)
      : "unknown";

    if (
      !login ||
      typeof login !== "string" ||
      !password ||
      typeof password !== "string" ||
      !phone ||
      typeof phone !== "string" ||
      !req.file ||
      !["image/png", "image/jpeg", "image/gif"].includes(imageFileType)
    ) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(400).send({ message: "Bad request" });
    }

    const existingUser = await User.findOne({ login });

    if (existingUser) {
      fs.unlinkSync(req.file.path);

      return res.status(409).send({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      login,
      password: hashedPassword,
      phone,
      avatar: `/uploads/${req.file.filename}`,
    });

    await newUser.save();

    res.status(201).send({
      message: "User registered successfully",
    });
  } catch (err) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).send({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;

    if (
      !login ||
      typeof login !== "string" ||
      !password ||
      typeof password !== "string"
    ) {
      return res.status(400).send({ message: "Bad request" });
    }

    const user = await User.findOne({ login });

    if (!user) {
      return res.status(401).send({
        message: "Invalid login or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).send({
        message: "Invalid login or password",
      });
    }

    req.session.user = {
      id: user._id,
      login: user.login,
    };

    res.status(200).send({
      message: "Logged in successfully",
    });
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).send({
        message: "Not authenticated",
      });
    }

    const user = await User.findById(req.session.user.id).select("-password");

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({
        message: "Server error",
      });
    }

    res.status(200).send({
      message: "Logged out successfully",
    });
  });
};
