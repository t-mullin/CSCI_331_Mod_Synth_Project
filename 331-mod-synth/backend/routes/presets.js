
const router = require('express').Router(); // Express router
const { response } = require('express');
let Preset = require('../models/preset.model'); // Get the user model

// Create the first route
router.route('/').get((req, response) => {
    Preset.find()
        .then(presets => response.json(presets))
        .catch(error => response.status(400).json(`Error: ${error}`));
});
// Given the ID in the url get that MongoDB object as a JSON
router.route('/:id').get((req, response) =>  {
    Preset.findById(req.params.id)
        .then(presets => response.json(presets))
        .catch(error => response.status(400).json(`Error: ${error}`));
});

module.exports = router;