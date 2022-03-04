const express = require("express")
const fileHandler = require("../setups/multer.js")
const fileController = require("../controllers/fileController.js")
const upload = require("../middlewares/upload.js")
const router = express.Router()

router.get("/upload", fileController.getUpload)
router.get("/upload-many", fileController.getUploadMany)
router.get("/my-uploads", fileController.myUploads)


router.post("/upload", fileHandler.single("myImage"), upload,fileController.upload)
router.post("/upload-many", fileHandler.array("myImages"), upload,fileController.uploadMany)


module.exports = router