
const router = require('express').Router();

const pizzaModel = require('../models/pizzaModel');



router.post('/',require('../controllers/typeController').allpizza);

router.post('/item-type',require('../controllers/typeController').pizza_type);




module.exports = router;