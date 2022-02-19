const express = require("express")
const fileHandler = require("../multer.js")
const fileController = require("../controllers/fileController.js")
const router = express.Router()

router.get("/upload", fileController.getUpload)

router.post("/upload", fileHandler.single("myImage"), fileController.upload)

router.get("/upload-many", fileController.getUploadMany)
router.post("/upload-many", fileHandler.array("myImages"), fileController.uploadMany)

router.get("/my-uploads", fileController.myUploads)

module.exports = router