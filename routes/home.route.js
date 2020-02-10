var express = require('express');
var router = express.Router();

var controller =  require('../controllers/home.controller');

router.get('/', controller.home);

module.exports = router;