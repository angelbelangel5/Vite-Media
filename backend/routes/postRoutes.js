const express = require('express');
const { createPost, getPosts, likePost, commentPost } = require('../controllers/postController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').post(protect, createPost).get(protect, getPosts);
router.route('/:id/like').post(protect, likePost);
router.route('/:id/comment').post(protect, commentPost);

module.exports = router;
