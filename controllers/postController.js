// controllers/PostController.js
class PostController {
  constructor() {
    this.postInsights = [];
  }

  savePosts(data) {
    this.postInsights = data;
  }

  getPosts() {
    return this.postInsights;
  }
}

// Export a singleton instance
module.exports = new PostController();
