const router = require("express").Router();
const controller = require("./imageProcessor.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").post(controller.resize).all(methodNotAllowed);

module.exports = router;
