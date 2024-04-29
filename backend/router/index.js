
const router = require('express').Router();

const middleware = require('../middleware/middleware');
const pizzaModel = require('../models/pizzaModel');

router.use('/user',middleware,require('./user'));
router.use('/auth', require('./auth'));

router.use('/type', require('./type'));

router.use('/order',middleware,require('./order'));




// Admin API

router.use('/admin',require('./admin'));


module.exports = router;