const path = require("path")
const Files = require("../models/fileModel.js")

const upload = async (req, res, next) => {
    //If File is not found then render the page with error message
    if (!req.file) {
        return res.render("form", {
            many: false,
            error: "Please Select a file"
        })
    }
    //Creating Files Model Instance
    const storeFile = new Files({
        url: req.fileUrls[0],
        name: req.file.originalname
    })
    try {
        await storeFile.save()
    } catch (error) {
        return next(error)
    }

    res.redirect("/files/my-uploads")
}

const uploadMany = async (req, res, next) => {
    //If File not Found then render the page with error message
    if (req.files.length === 0) {
        // return next(MyErrors.noFileSubmitted(405, "Please Select a file"))
        return res.render("form", {
            many: true,
            error: "Please select atleast one File"
        })
    }
    //construct the array of objects to store into database
    const fileData = []
    for(let i=0; i<req.files.length;i++){
        fileData.push({
            url: req.fileUrls[i],
            name: req.files[i].originalname,
            
        })
    }
    
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
        const fileData = []
        data.map((element)=>{
            let type = element.name.split(".")[1] === "mp4" ? "video" : "img"
            fileData.push({
                data:element,
                type
            })
        })
        console.log(fileData);
        res.render("viewFiles", { fileData })
    } catch (error) {
        next(error)
    }
}

const getUploadMany = (req, res) => {
    res.render("form", {
        many: true,
        error: undefined
    })
}

const getUpload = (req, res) => {
    res.render("form", {
        many: false,
        error: undefined
    })
}

module.exports = {
    upload, uploadMany, myUploads, getUpload, getUploadMany
}