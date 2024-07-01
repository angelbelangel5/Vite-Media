const Post = require('../models/Post');

const createPost = async (req, res) => {
  const { content } = req.body;
  const post = new Post({
    user: req.user._id,
    content,
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
};

const getPosts = async (req, res) => {
  const posts = await Post.find().populate('user', 'username').sort({ createdAt: -1 });
  res.json(posts);
};

const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    if (post.likes.includes(req.user._id)) {
      post.likes.pull(req.user._id);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

const commentPost = async (req, res) => {
  const { comment } = req.body;
  const post = await Post.findById(req.params.id);

  if (post) {
    const newComment = {
      user: req.user._id,
      comment,
    };

    post.comments.push(newComment);
    await post.save();
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

module.exports = { createPost, getPosts, likePost, commentPost };
