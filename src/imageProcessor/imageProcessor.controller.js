const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const resizeImage = async (req, res, next) => {
  res.json("Test");
};

module.exports = {
  resize: resizeImage,
};
