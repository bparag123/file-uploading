const multer = require("multer")
const MyErrors = require("../utils/myerror.js")


const fileHandle = multer({
    fileFilter: (req, file, cb)=>{
        //here we can perform file format validation like type of file
        const [type, format] = file.mimetype.split("/")
        
        if(type === "image" && format!=="png"){
            return cb(MyErrors.invalidFileFormat(408, "Image should be only png"))
        }
        if(type === "video" && format!=="mp4"){
            return cb(MyErrors.invalidFileFormat(408, "Image should be only mp4"))
        }
        cb(null, true);
    },
    //file size in bytes
    limits:{
        fileSize: 1024 * 1024 * 512
    },

})

module.exports = fileHandle