var mongoose = require('mongoose');
//Define a schema
var Schema      = mongoose.Schema;

var schemaModel = new Schema({
    email           : { type: String,   required: true},
    nombreCompleto  : { type: String,   required: true},
    password        : { type: String,   required: true},
    file            : String,
    createdAt       : { type: Date, default: Date.now },
    updateAt        : Date,
    status         : { type: Boolean, default:true, enum:[true, false] }
}, { versionKey: false });

// Compile model from schema
return module.exports = mongoose.model('usuarios', schemaModel );