var mongoose = require('mongoose');
var state = {
    db: null,
}

exports.connect = function(url, done) {
    mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;
    //Get the default connection
    var db = mongoose.connection;
    state.db = db;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

exports.get = function() {
    return state.db
}

exports.close = function(done) {
    if (state.db) {
        state.db.close(function(err, result) {
            state.db = null
            state.mode = null
            done(err)
        })
    }
}