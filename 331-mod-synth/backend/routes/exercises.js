
const router = require('express').Router(); // Express router
let Exercise = require('../models/exercise.model'); // Get the user model

// Create the first route
router.route('/').get((req, response) => {
    Exercise.find()
        .then(exercises => response.json(exercises))
        .catch(error => response.status(400).json(`Error: ${error}`));
});

// Create a new exercise post
router.route('/add').post((req, response) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
        .then(() => response.json('Exercise added'))
        .catch(error => response.status(400).json(`Error: ${error}`));
});

module.exports = router;