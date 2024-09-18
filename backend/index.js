// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');
// const connectDB = require('./config/db');

// // Initialize the app
// dotenv.config();
// const app = express();


// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // Add this line if you need to handle form submissions
// app.use(cors());
// app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// // Set EJS as the templating engine
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // Routes
// app.use('/api/posts', require('./routes/post'));

// // Define EJS routes
// app.get('/', (req, res) => {
//     res.render('index', { title: 'Home Page' });
// });

// app.get('/posts', (req, res) => {
//     // Mock data, replace with actual data from database
//     const posts = [
//         { id: 1, title: 'First Post', content: 'This is the first post.' },
//         { id: 2, title: 'Second Post', content: 'This is the second post.' },
//     ];

//     res.render('posts', { title: 'Blog Posts', posts });
// });

// // Catch 404 and forward to error handler
// app.use((req, res, next) => {
//     res.status(404).render('404', { title: 'Page Not Found' });
// });

// // Error handler
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).render('500', { title: 'Server Error' });
// });

// // Listen on port
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const PostController = require('./controllers/PostController');

// Initialize the app
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To handle form submissions
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes

// Home page
app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});

// View all posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await PostController.getAllPosts(req, res);
        res.render('posts', { title: 'Blog Posts', posts });
    } catch (err) {
        res.status(500).render('500', { title: 'Server Error' });
    }
});

// Add post form route
app.get('/posts/add', (req, res) => {
    res.render('addPost', { title: 'Add New Post' });
});

// Handle form submission for creating a new post
app.post('/posts/add', PostController.createPost);

// Edit post form route
app.get('/posts/edit/:id', async (req, res) => {
    try {
        const post = await PostController.getPostById(req, res);
        if (!post) {
            return res.status(404).render('404', { title: 'Post Not Found' });
        }
        res.render('editPost', { title: 'Edit Post', post });
    } catch (err) {
        console.error('Error fetching post:', err);
        res.status(500).render('500', { title: 'Server Error' });
    }
});

// Handle form submission for editing a post
app.post('/posts/edit/:id', PostController.updatePost);

// Handle post deletion
app.post('/posts/delete/:id', PostController.deletePost);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', { title: 'Server Error' });
});

// Listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

