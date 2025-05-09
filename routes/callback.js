const express = require('express');
const axios = require('axios');
const router = express.Router();

const appId = process.env.APP_ID;
const appSecret = process.env.APP_SECRET;
const redirectUri = 'https://callbackurl-facebook.vercel.app/auth/facebook/callback';

router.get('/facebook/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const tokenResponse = await axios.get('https://graph.facebook.com/v22.0/oauth/access_token', {
      params: {
        client_id: appId,
        redirect_uri: redirectUri,
        client_secret: appSecret,
        code,
      },
    });

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get('https://graph.facebook.com/me', {
      params: {
        fields: 'id,name,email',
        access_token: accessToken,
      },
    });

    const userData = userResponse.data;
    console.log(userData);

    res.json({ user: userData, accessToken: accessToken });
  } catch (error) {
    console.error('Error exchanging code:', error.response?.data || error.message);
    res.status(500).send('Authentication failed');
  }
});

module.exports = router;
