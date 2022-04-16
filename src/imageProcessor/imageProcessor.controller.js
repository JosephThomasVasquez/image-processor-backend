const path = require("path");
const fs = require("fs");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const Jimp = require("jimp");
const { MIME_JPEG, MIME_PNG, MIME_GIF } = require("jimp");

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

  //   const filePath = path.normalize(__dirname + "/public/assets/");
  //   console.log("filePath:", filePath);

  //   console.log(res.locals.image);

  let count = 1;
  //   let newFile = `${filePath}lenna-${count}.jpg`;

  // Resize the image
  const resizedImage = Jimp.read(fileURL, (error, image) => {
    if (error) {
      return next({
        status: 400,
        message: `Please choose a valid image file.`,
      });
    }

    let processedImage = null;

    let resizeProcess = image
      .resize(Number(req.body.data.Width), Jimp.AUTO)
      .quality(1);

    //   Process Brightness
    if (req.body.data.brightness) {
      resizeProcess = resizeProcess.brightness(req.body.data.brightness * 0.01);
    }

    //   Process Contrast
    if (req.body.data.contrast) {
      resizeProcess = resizeProcess.contrast(req.body.data.contrast * 0.01);
    }

    //   Process Grayscale
    if (req.body.data.grayscale) {
      resizeProcess = resizeProcess.greyscale();
    }

    //   Process Grayscale
    if (req.body.data.inverted) {
      resizeProcess = resizeProcess.invert();
    }

    //   Send processed image preview

    const formats = { jpeg: MIME_JPEG, gif: MIME_GIF, png: MIME_PNG };

    resizeProcess
      .getBase64Async(formats[req.body.data.format])
      .then((newImage) => {
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
  resize: asyncErrorBoundary(resizeImage),
};
