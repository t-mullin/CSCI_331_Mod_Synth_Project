const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

// Create Express object and set port
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connected successfully");
})

// Route files
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// Use files
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Start server
app.listen(port, () => {
    console.log(`Server port: ${port}`);
});