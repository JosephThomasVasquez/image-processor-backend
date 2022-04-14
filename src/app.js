const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const imageProcessorRouter = require("./imageProcessor/imageProcessor.router");

const app = express();

app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);
app.use(express.json());

app.use("/", imageProcessorRouter);

// error handler
app.use(errorHandler);
app.use(notFound);

module.exports = app;
