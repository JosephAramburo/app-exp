var express = require('express');
var router = express.Router();

var controller =  require('../controllers/authentication.controller');

router.post('/login', controller.oauth);

module.exports = router;