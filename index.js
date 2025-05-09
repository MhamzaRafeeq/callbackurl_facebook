const express = require('express');
const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose')


const app = express();
const callbackRoute = require("./routes/callback");
const reelRoute = require("./routes/video_reels");
const chart = require('./routes/charts');
const trends = require('./routes/trends');
app.use(express.json());

mongoose.connect(process.env.CONNECTION_STRING, { dbName: "hamza" })
    .then(() => {
        console.log("MongoDB connected")
    })

app.use('/auth', callbackRoute );
app.use('/api', reelRoute);
app.use('/api', chart);
app.use('/api', trends);


app.listen(3000, () => console.log('Server started on port 3000'));
