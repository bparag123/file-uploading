const express = require("express")
const fileRouter = require("./routes/fileRoutes.js")
const path = require("path")
//This is database Connection Setup
require("./setups/dbConnect.js")
const errorHandler = require("./controllers/errorHandler.js")
const app = express()

const PORT = process.env.PORT || 3000

const STATIC_DIR = path.join(__dirname, "./static")

app.use(express.json())
app.use(express.static(STATIC_DIR))

//Setting up template engine
app.set("view engine", "ejs")
app.set("views", "templates")

//This is the setup for controlling file routes
app.use("/files", fileRouter)

//This is for 404 Page not Found
app.use("*", (req, res)=>{
    res.status(404).render("error404")
})

//This is binding of errorhandler middleware 
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server is Up and Running on port ${PORT}`);
})