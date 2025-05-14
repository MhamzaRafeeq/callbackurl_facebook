// routes/getPosts.js
const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');

router.get('/posts/insights', (req, res) => {
  const data = PostController.getPosts();
  res.status(200).json(data);
});

module.exports = router;
