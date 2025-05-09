const express = require('express');
const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose')
// https://www.facebook.com/v22.0/dialog/oauth?
//   client_id=YOUR_APP_ID
//   &redirect_uri=YOUR_REDIRECT_URI
//   &scope=email,public_profile


const app = express();
const callbackRoute = require("./routes/callback");
const reelRoute = require("./routes/video_reels");
app.use(express.json());

mongoose.connect(process.env.CONNECTION_STRING, { dbName: "hamza" })
    .then(() => {
        console.log("MongoDB connected")
    })

app.use('/auth', callbackRoute );
app.use('/api', reelRoute);


app.listen(3000, () => console.log('Server started on port 3000'));
