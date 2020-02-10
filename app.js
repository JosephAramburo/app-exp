var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
var logger = require('morgan');
var cors = require('cors');
var DB_MONGO = require('./connectionDB');
var moment = require('moment-timezone');
var router = express.Router();

// initialize configuration
dotenv.config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.enable('trust proxy');

moment.tz.setDefault("America/Mazatlan");


app.use(cors())

//archivos de rutas
const oauth           = require('./routes/authentitcation.route');
const todo            = require('./routes/todo.route');
const home            = require('./routes/home.route');

app.use('/', home);
app.use('/authentication', oauth);
app.use('/todo', todo);

//****** CONEXION A LA BASE DE DATOS */
DB_MONGO.connect(process.env.URL_DATABASE, function(err) {
  if (err) {
      console.log("Error al conectarse a la BASE DE DATOS");
      process.exit(1);
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  return res.status(404).json({ message: "resource not found" });
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
