require("dotenv").config()
const { google } = require("googleapis")
const { Readable } = require('stream')

const CLIENT_SECRET = process.env.CLIENT_SECRET
const CLIENT_ID = process.env.CLIENT_ID
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN


const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

const drive = google.drive({
    version: "v3",
    auth: oAuth2Client
})

const upload = async (req, res, next) => {

    if (!req.file && !req.files) {
        return res.json({
            message: "Please Provide file"
        })
    }
    let files;
    if (req.files) {
        files = req.files
    } else {
        files = [req.file]
    }
    const fileIds = []
    const fileUrls = []
    for (let i = 0; i < files.length; i++) {
        //Generating the name of the file with date

        const randomString = new Date().getTime()
        const [name, extension] = files[i].originalname.split(".")
        const filename = `${name}-${randomString}.${extension}`

        //creating readable stream from file buffer
        const stream = Readable.from(files[i].buffer);
        //Uploading the file into the drive 

        const result = await drive.files.create({
            requestBody: {
                name: filename,
                mimeType: "image/png"
            },
            media: {
                mimeType: "image/png",
                body: stream
            }
        })
        //the id of uploaded file
        fileIds.push(result.data.id)
        //Create Permission to get the file url

        drive.permissions.create({
            fileId: fileIds[i],
            requestBody: {
                role: "reader",
                type: "anyone"
            }
        })
        fileUrls.push(`https://drive.google.com/uc?export=view&id=${fileIds[i]}`)
    }
    req.fileUrls = fileUrls

    next()

}
module.exports = upload