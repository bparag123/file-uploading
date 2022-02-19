const path = require("path")
const Files = require("../models/fileModel.js")

const upload = async (req, res, next) => {

    const storeFile = new Files({
        url: path.join("/files", req.file.filename),
        name: req.file.originalname
    })
    try {
        await storeFile.save()
    } catch (error) {
        return next(error)
    }

    res.redirect("/files/my-uploads")
}

const uploadMany = async (req, res) => {

    const fileData = req.files.map((val) => {
        return { url: path.join(__dirname, "../Uploaded", val.filename), name: val.originalname }
    })
    try {
        await Files.insertMany(fileData)
    } catch (error) {
        return next(error)
    }
    res.redirect("/files/my-uploads")
}

const myUploads = async (req, res) => {
    try {
        const data = await Files.find()
        res.render("viewFiles", { data })
    } catch (error) {
        next(error)
    }

    
}

const getUploadMany = (req, res) => {
    res.render("form", {
        success: false,
        many: true
    })
}

const getUpload = (req, res) => {
    res.render("form", {
        success: false,
        many: false
    })
}

module.exports = {
    upload, uploadMany, myUploads, getUpload, getUploadMany
}