var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EstablishmentSchema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    phonenumber: { type: String, required: false },
    time: { type: String, required: false },
    deals: { type: String, required: true },
    focus: { type: String, required: false },
    address: { type: String, required: false },
    city: { type: String, required: true },
    zipcode: { type: Number, required: false },
    empAdded: { type: Boolean, required: false },
    empPosition: { type: String, required: false },
    avoid: { type: String, required: false },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    flag: { type: Boolean, default: true },
    date: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Establishment', EstablishmentSchema);