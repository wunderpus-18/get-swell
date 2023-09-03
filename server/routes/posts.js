const express = require('express');
const router = express.Router();
const postController = require('./../controllers/postController.js');

// GET ALL POSTS BY PREFERENCE
// fetch will include array of preferences (from menu)
router.get('/', postController.getFilteredPosts, (req, res) => {
  res.status(200).json(res.locals.filteredPosts);
});

// CREATE NEW POST
router.post('/', postController.createPost, (_, res) => {
  res.status(200).json(res.locals.newPost);
});

// UPDATE POST
router.patch('/:id', postController.updatePost, (_, res) => {
  res.status(200).json(res.locals.updatedPost);
});

// DELETE POST
router.delete('/:id', postController.deletePost, (_, res) => {
  res.status(200).json(res.locals.deletedPost);
});

module.exports = router;
