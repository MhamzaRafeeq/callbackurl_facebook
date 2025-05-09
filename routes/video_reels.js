const express = require("express")
const ReelData = require("../schemas/video_reels");
const router = express.Router();


router.post("/reels", async (req, res)=>{
    const {permalink_url,thumbnail_uris, views, comments, id } = req.body;
try {
    const reelData = { permalink_url, thumbnail_uris, views, comments, id};
    const reel = await ReelData(reelData)
        reel.save();
        res.status(201).json({ message: "Reel data stored successfully", reel })    
    
} catch (error) {
    res.status(500).json({ error })

}
});

module.exports = router