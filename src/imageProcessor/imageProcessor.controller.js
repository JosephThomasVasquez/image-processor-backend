const path = require("path");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const Jimp = require("jimp");

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

  const filePath = __dirname + "/public/assets/";
  console.log("filePath:", filePath);

  console.log(res.locals.image);

  let count = 1;
  let newFile = `${filePath}/lenna-${count}.jpg`;

  // Resize the image
  const resizedImage = await Jimp.read(fileURL, (error, image) => {
    if (error) {
      return next({
        status: 400,
        message: `Please choose a valid image file.`,
      });
    }

    image
      .resize(256, 256)
      .quality(60)
      .greyscale()
      .write(newFile, res.download(newFile));

    count++;
  });

  //   console.log("ASFDFDSAFASDFESADF", resizedImage);

  //   res.json(newFile);
};

module.exports = {
  resize: resizeImage,
};
