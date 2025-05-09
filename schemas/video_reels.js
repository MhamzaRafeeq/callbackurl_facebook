const mongoose = require("mongoose")
const { Schema } = mongoose

const schema = new Schema({
    permalink_url: { type: String },
    thumbnail_uris: { type: [String] },
    views: { type: Number },
    comments: { type: [String] },
    id: { type: String },
}, { timestamps: true })

const reel = mongoose.model("reel_data", schema)
module.exports = reel;