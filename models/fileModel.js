const mongoose = require("mongoose")

const fileStoreSchema = mongoose.Schema({
    url : String,
    name : String
}, {
    timestamps: true
})

module.exports = mongoose.model("Files", fileStoreSchema)

