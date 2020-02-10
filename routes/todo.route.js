var express = require('express');
var router = express.Router();

var controller      =  require('../controllers/todo.controller');
const middelware    = require('../middleware');

router.get('/',         middelware.authorization, controller.getByFilters);
router.get('/:id',      middelware.authorization, controller.getById);
router.post('/',        middelware.authorization, controller.save);
router.put('/:id',      middelware.authorization, controller.update);
router.delete('/:id',   middelware.authorization, controller.deleteF);

module.exports = router;