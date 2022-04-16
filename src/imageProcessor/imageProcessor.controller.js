const path = require("path");
const fs = require("fs");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const Jimp = require("jimp");
const { MIME_JPEG } = require("jimp");

const hasData = (req, res, next) => {
  const { data = {} } = req.body;

  if (!data) {
    return next({
      status: 400,
      message: `Please choose a valid image file.`,
    });
  }

  res.locals.image = data;
  next();
};

const resizeImage = async (req, res, next) => {
  console.log(req.body);
  const fileURL = req.body.data.url;
  //   const fileURL =
  //     "https://images.unsplash.com/photo-1649565023079-56bac30e38ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80";

  const filePath = path.normalize(__dirname + "/public/assets/");
  console.log("filePath:", filePath);

  //   console.log(res.locals.image);

  let count = 1;
  let newFile = `${filePath}lenna-${count}.jpg`;

  // Resize the image
  const resizedImage = Jimp.read(fileURL, (error, image) => {
    if (error) {
      return next({
        status: 400,
        message: `Please choose a valid image file.`,
      });
    }

    image
      .resize(512, Jimp.AUTO)
      .quality(60)
      .greyscale()
      .getBase64Async(MIME_JPEG)
      .then((newImage) => {
        console.log("newImage", newImage);
        //   let tag = document.createElement("img");
        //   tag.src = newImage;
        //   document.getElementById("img-container").append(tag);
        res.json({ data: newImage });
      });
    // image
    //   .resize(256, 256)
    //   .quality(60)
    //   .greyscale()
    //   .writeAsync(newFile, res.download(newFile));
  });
};

module.exports = {
  resize: resizeImage,
};
