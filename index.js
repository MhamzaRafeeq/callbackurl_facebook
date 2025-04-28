const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const appId = process.env.APP_ID;
const appSecret = process.env.APP_SECRET;
const redirectUri = 'https://callbackurl-facebook.vercel.app/auth/facebook/callback';

app.get('/auth/facebook/callback', async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange code for access token
    const tokenResponse = await axios.get(`https://graph.facebook.com/v22.0/oauth/access_token`, {
      params: {
        client_id: appId,
        redirect_uri: redirectUri,
        client_secret: appSecret,
        code,
      },
    });

    const accessToken = tokenResponse.data.access_token;

    // Fetch user info (optional)
    const userResponse = await axios.get(`https://graph.facebook.com/me`, {
      params: {
        fields: 'id,name,email',
        access_token: accessToken,
      },
    });

    const userData = userResponse.data;
    console.log(userData);

    res.json({ user: userData });
  } catch (error) {
    console.error('Error exchanging code:', error);
    res.status(500).send('Authentication failed');
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));
