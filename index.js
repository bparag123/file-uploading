const express = require("express")
const fileRouter = require("./routes/fileRoutes.js")
const path = require("path")
require("./dbConnect.js")
const errorHandler = require("./controllers/errorHandler.js")
const app = express()

const PORT = process.env.PORT || 3000

const STATIC_DIR = path.join(__dirname, "./static")

app.use(express.json())
app.use(express.static(STATIC_DIR))

app.set("view engine", "ejs")
app.set("views", "templates")

app.use("/files", fileRouter)

app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server is Up and Running on port ${PORT}`);
})