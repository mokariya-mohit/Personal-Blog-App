const Post = require('../models/Post');

// Create Post
const createPost = async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = new Post({ title, content });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        console.error('Error creating post:', err); // Log the error
        res.status(500).json({
            message: 'An error occurred while creating the post.',
            error: err.message
        });
    }
};

// Get All Posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        console.error('Error fetching posts:', err); // Log the error
        res.status(500).json({
            message: 'An error occurred while fetching the posts.',
            error: err.message
        });
    }
};

// Get Single Post
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        console.error('Error fetching post by ID:', err); // Log the error
        res.status(500).json({
            message: 'An error occurred while fetching the post.',
            error: err.message
        });
    }
};

// Update Post
const updatePost = async (req, res) => {
    const { title, content } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(updatedPost);
    } catch (err) {
        console.error('Error updating post:', err); // Log the error
        res.status(500).json({
            message: 'An error occurred while updating the post.',
            error: err.message
        });
    }
};

// Delete Post
const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.error('Error deleting post:', err); // Log the error
        res.status(500).json({
            message: 'An error occurred while deleting the post.',
            error: err.message
        });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
};
