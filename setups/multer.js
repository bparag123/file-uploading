const multer = require("multer")
const MyErrors = require("../utils/myerror.js")

const fileStorage = multer.diskStorage({
    //Setting up directory to store the files uploaded
    destination : (req, file, cb)=>{
        cb(null, "static/files")
    },
    //This is for customising the name of the file.

    filename: (req, file, cb)=>{
        const randomString = new Date().getTime()
        const [name, extension] = file.originalname.split(".")
        cb(null, `${name}-${randomString}.${extension}`)
    }
})

const fileHandle = multer({
    fileFilter: (req, file, cb)=>{
        //here we can perform file format validation like type of file
        const [type, format] = file.mimetype.split("/")
        
        if(type === "image" && format!=="jpeg"){
            return cb(MyErrors.invalidFileFormat(408, "Image should be only jpg"))
        }
        if(type === "video" && format!=="mp4"){
            return cb(MyErrors.invalidFileFormat(408, "Image should be only mp4"))
        }
        cb(null, true);
    },
    storage: fileStorage,
    //file size in bytes
    limits:{
        fileSize: 1024 * 1024 * 512
    },

})

module.exports = fileHandle