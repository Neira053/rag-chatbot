const express = require("express");

const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");
const uploadController = require("../controllers/uploadController");

router.post(
    "/",
    upload.single("pdf"),
    uploadController.upload
);

module.exports = router;