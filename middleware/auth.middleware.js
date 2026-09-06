const User = require("../models/User.model");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.session.user) {
      return res.status(401).send({
        message: "Not authenticated",
      });
    }

    const user = await User.findById(req.session.user.id);

    if (!user) {
      return res.status(401).send({
        message: "Not authenticated",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(500).send({
      message: "Server error",
    });
  }
};

module.exports = authMiddleware;
