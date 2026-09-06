const fs = require("fs");
const Ad = require("../models/Ad.model");
const getImageFileType = require("../utils/getImageFileType");

exports.getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find().populate("author", "-password");

    res.status(200).send(ads);
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }
};

exports.getAdById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate("author", "-password");

    if (!ad) {
      return res.status(404).send({
        message: "Ad not found",
      });
    }

    res.status(200).send(ad);
  } catch (err) {
    res.status(400).send({
      message: "Invalid ad id",
    });
  }
};

exports.addAd = async (req, res) => {
  try {
    const { title, content, price, location } = req.body;

    const imageFileType = req.file
      ? await getImageFileType(req.file)
      : "unknown";

    if (
      !title ||
      typeof title !== "string" ||
      title.length < 10 ||
      title.length > 50 ||
      !content ||
      typeof content !== "string" ||
      content.length < 20 ||
      content.length > 1000 ||
      price === undefined ||
      Number(price) < 0 ||
      !location ||
      typeof location !== "string" ||
      !req.file ||
      !["image/png", "image/jpeg", "image/gif"].includes(imageFileType)
    ) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(400).send({
        message: "Bad request",
      });
    }

    const newAd = new Ad({
      title,
      content,
      price: Number(price),
      location,
      image: `/uploads/${req.file.filename}`,
      author: req.user._id,
    });

    await newAd.save();

    const savedAd = await Ad.findById(newAd._id).populate(
      "author",
      "-password",
    );

    res.status(201).send(savedAd);
  } catch (err) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).send({
      message: "Server error",
    });
  }
};

exports.updateAd = async (req, res) => {
  try {
    const { title, content, price, location } = req.body;

    const imageFileType = req.file ? await getImageFileType(req.file) : null;

    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(404).send({
        message: "Ad not found",
      });
    }

    if (ad.author.toString() !== req.user._id.toString()) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(403).send({
        message: "Forbidden",
      });
    }

    if (
      !title ||
      typeof title !== "string" ||
      title.length < 10 ||
      title.length > 50 ||
      !content ||
      typeof content !== "string" ||
      content.length < 20 ||
      content.length > 1000 ||
      price === undefined ||
      Number(price) < 0 ||
      !location ||
      typeof location !== "string"
    ) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(400).send({
        message: "Bad request",
      });
    }

    if (
      req.file &&
      !["image/png", "image/jpeg", "image/gif"].includes(imageFileType)
    ) {
      fs.unlinkSync(req.file.path);

      return res.status(400).send({
        message: "Invalid image file",
      });
    }

    const oldImagePath = ad.image;

    ad.title = title;
    ad.content = content;
    ad.price = Number(price);
    ad.location = location;

    if (req.file) {
      ad.image = `/uploads/${req.file.filename}`;
    }

    await ad.save();

    if (req.file && oldImagePath) {
      const oldImageFullPath = `public${oldImagePath}`;

      if (fs.existsSync(oldImageFullPath)) {
        fs.unlinkSync(oldImageFullPath);
      }
    }

    const updatedAd = await Ad.findById(ad._id).populate("author", "-password");

    res.status(200).send(updatedAd);
  } catch (err) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(400).send({
      message: "Invalid ad id",
    });
  }
};

exports.deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);

    if (!ad) {
      return res.status(404).send({
        message: "Ad not found",
      });
    }

    if (ad.author.toString() !== req.user._id.toString()) {
      return res.status(403).send({
        message: "Forbidden",
      });
    }

    const imagePath = ad.image;

    await Ad.findByIdAndDelete(req.params.id);

    if (imagePath) {
      const imageFullPath = `public${imagePath}`;

      if (fs.existsSync(imageFullPath)) {
        fs.unlinkSync(imageFullPath);
      }
    }

    res.status(200).send({
      message: "Ad deleted successfully",
    });
  } catch (err) {
    res.status(400).send({
      message: "Invalid ad id",
    });
  }
};

exports.searchAds = async (req, res) => {
  try {
    const { searchPhrase } = req.params;

    const ads = await Ad.find({
      title: {
        $regex: searchPhrase,
        $options: "i",
      },
    }).populate("author", "-password");

    res.status(200).send(ads);
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }
};
