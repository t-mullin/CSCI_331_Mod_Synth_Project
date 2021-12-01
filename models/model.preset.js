const mongoose = require("mongoose");

const oscSchema = mongoose.Schema({
    freq: Number,
    type: String,
    out: String,
});

const lfoSchema = mongoose.Schema({
    freq: Number,
    type: String,
    out: String,
});

const filterSchema = mongoose.Schema({
    freq: Number,
    res: Number,
    type: String,
    out: String,
});

const vcaSchema = mongoose.Schema({
    gain: Number,
    out: String,
});

const distortionSchema = mongoose.Schema({
    freq: Number,
    out: String,
});
const presetSchema = mongoose.Schema({
    "preset name": String,
    description: Object,
});

module.exports = mongoose.model("Preset", presetSchema);