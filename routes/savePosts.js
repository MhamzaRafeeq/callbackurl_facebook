// routes/savePosts.js
const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');

router.post('/posts/insights', (req, res) => {
  const postData = req.body;

  if (!Array.isArray(postData)) {
    return res.status(400).json({ error: 'Expected an array of post data' });
  }

  PostController.savePosts(postData);

  res.status(200).json({
    message: 'Post insights saved successfully',
    count: postData.length
  });
});

module.exports = router;
