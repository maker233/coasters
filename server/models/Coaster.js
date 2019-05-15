const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CoasterSchema = new Schema({
    title: { type: String, default: `Coaster Default` },
    description: { type: String, default: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua` },
    length: { type: Number, default: 0 },
    inversions: { type: Number, default: 0 },
    imageUrl: { type: String, default: `http://www.cronicaviva.com.pe/wp-content/uploads/2018/06/MontanaRusa.jpg` },
}, {
        timestamps: true
    });

const Coaster = mongoose.model('Coaster', CoasterSchema);
module.exports = Coaster;