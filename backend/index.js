const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Initialize the app
dotenv.config();
const app = express();


// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/posts', require('./routes/post'));

app.get('/', (req, res) => {
    res.send('Blog API running...');
});

// Listen on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
