const express = require('express');
const router = express.Router();
const PostController = require('../controllers/postController');

/**
 * Generic analysis for any metric (comments, likes, impressions, shares).
 */
function getTopPostMetricAnalysis(posts, metric = 'comments') {
  if (posts.length < 2) {
    return { error: 'Need at least 2 posts to perform comparison.' };
  }

  // Validate metric exists in posts
  const valid = posts.every(post => metric in post && typeof post[metric] === 'number');
  if (!valid) {
    return { error: `Invalid or missing "${metric}" in one or more posts.` };
  }

  // Step 1: Find top post by metric
  const topPost = posts.reduce((max, curr) => (curr[metric] > max[metric] ? curr : max));

  // Step 2: Get all posts except top one
  const others = posts.filter(post => post.id !== topPost.id);
  const total = others.reduce((sum, post) => sum + post[metric], 0);
  const avg = total / others.length;

  const factor = (topPost[metric] / avg).toFixed(2);

  return {
    message: `Post ID ${topPost.id} is getting ${factor}× more ${metric} than your other posts (average ${avg.toFixed(1)}).`,
    metric,
    topPost,
    averageOtherPosts: avg
  };
}

// Generic GET route to analyze top metric
router.get('/analyze/top', (req, res) => {
  const metric = req.query.metric || 'comments'; // default to comments
  const postInsights = PostController.getPosts();

  if (!postInsights || postInsights.length < 2) {
    return res.status(400).json({ error: 'At least 2 posts are required for analysis.' });
  }

  const result = getTopPostMetricAnalysis(postInsights, metric);
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  res.json(result);
});

module.exports = router;
