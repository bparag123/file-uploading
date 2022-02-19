const MyErrors = require("../utils/myerror.js")

const errorHandler = (error, req, res, next)=>{
    if (error instanceof MyErrors) {
        return res.status(error.statusCode).json({
            message: error.errMsg
        })
    }
    else{
        return res.status(400).json({
            message: error.message
        })
    }

}

module.exports = errorHandler