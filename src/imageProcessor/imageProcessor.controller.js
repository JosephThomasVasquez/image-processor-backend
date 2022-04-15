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
  const fileURL =
    "https://images.pexels.com/photos/296282/pexels-photo-296282.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";

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

    // console.log(
    //   "image",
    //   image.getBufferAsync(MIME_JPEG, (error, img) => {
    //     if (error) reject(error);
    //     else resolve(img);
    //   })
    // );

    // image.getBase64Async(MIME_JPEG).then((newImage) => {
    //   console.log("newImage", newImage);
    //   //   let tag = document.createElement("img");
    //   //   tag.src = newImage;
    //   //   document.getElementById("img-container").append(tag);
    // });

    image
      .resize(256, Jimp.AUTO)
      .quality(60)
      .greyscale()
      .getBase64Async(MIME_JPEG)
      .then((newImage) => {
        console.log("newImage", newImage);
        //   let tag = document.createElement("img");
        //   tag.src = newImage;
        //   document.getElementById("img-container").append(tag);
        res.send(
          `<div><img src="${fileURL}"></img><img src="${newImage}"></img></div>`
        );
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
