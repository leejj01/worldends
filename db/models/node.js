var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var waySchema = new Schema({
    id : Number,
    dest : Number,
    event : [Number],
    length : [Number]
}, { collection: 'way' });
var nodeSchema = new Schema({
    id: Number,
    name: String,
    background : Number,
    event : Number,
    boss : Boolean,
    next : Number
}, { collection: 'map' });

module.exports = mongoose.model('node', nodeSchema);