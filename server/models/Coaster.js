const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CoasterSchema = new Schema({
    title: String,
    description: String,
    length: Number,
    inversions: Number,
    imageUrl: String
}, {
        timestamps: true
    });

const Coaster = mongoose.model('Coaster', CoasterSchema);
module.exports = Coaster;