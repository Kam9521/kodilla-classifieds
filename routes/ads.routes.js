const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const adsController = require("../controllers/ads.controller");

router.get("/ads", adsController.getAllAds);

router.get("/ads/search/:searchPhrase", adsController.searchAds);

router.get("/ads/:id", adsController.getAdById);

router.post(
  "/ads",
  authMiddleware,
  upload.single("image"),
  adsController.addAd,
);

router.put(
  "/ads/:id",
  authMiddleware,
  upload.single("image"),
  adsController.updateAd,
);

router.delete("/ads/:id", authMiddleware, adsController.deleteAd);

module.exports = router;
