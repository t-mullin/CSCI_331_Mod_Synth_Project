var express = require('express');
var router = express.Router();

router.get('/fetch', async (req, res) => {
    try {
        const preset = await Preset.find({});
        if (!preset) return res.status(400).send('presets not found');
        res.send(preset);
    } catch(err) {
        res.status(400).send(err);
    }
});

module.exports = router;