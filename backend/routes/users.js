
const router = require('express').Router(); // Express router
let User = require('../models/user.model'); // Get the user model

// Create the first route
router.route('/').get((req, response) => {
    User.find()
        .then(users => response.json(users))
        .catch(error => response.status(400).json(`Error: ${error}`));
});

// Create a new user post
router.route('/add').post((req, response) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
        .then(() => response.json('User added'))
        .catch(error => response.status(400).json(`Error: ${error}`));
});

module.exports = router;