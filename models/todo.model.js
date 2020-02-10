var mongoose = require('mongoose');
//Define a schema
var Schema      = mongoose.Schema;

var schemaModel = new Schema({
    Description     : { type: String,   required: true},
    File            : { type: String,   required: true},
    TypeFile        : { type: String,   required: true},
    CreatedAt       : { type: Date, default: Date.now },
    UpdateAt        : Date,
    Status          : { type: Boolean, default:true, enum:[true, false] }
}, { versionKey: false, collation : 'todo' });

// Compile model from schema
return module.exports = mongoose.model('Todo', schemaModel, 'todo' );