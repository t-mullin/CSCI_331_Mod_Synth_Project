const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const oscSchema = new Schema({
    freq: { type: Number },
    type: { type: String },
    out: { type: String },
});

const lfoSchema = new Schema({
    freq: { type: Number },
    type: { type: String },
    out: {type: String },
});

const filterSchema = new Schema({
    freq: { type: Number },
    res: { type: Number },
    type: { type: String },
    out: { type: String },
});

const vcaSchema = new Schema({
    gain: {type: Number },
    out: { type: String },
});

const distortionSchema = new Schema({
    amount: { type: Number },
    out: { type: String},
});

const presetSchema = new Schema({
    presetname: { type: String },
    description: { oscSchema, lfoSchema, filterSchema, vcaSchema, distortionSchema },
}, {
    timestamps: true,
});

const Preset = mongoose.model('Preset', presetSchema);

module.exports = Preset;