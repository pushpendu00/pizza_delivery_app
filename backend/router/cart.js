const middleware = require('../middleware/middleware');



const router = require('express').Router();




router.post('/addToCart', middleware, require('../controllers/cartController').addToCart);

router.post('/increment-item',middleware, require('../controllers/cartController').increment_item);

router.post('/decrement-item',middleware, require('../controllers/cartController').decrement_item);

router.post('/remove-item',middleware, require('../controllers/cartController').remove_item);

module.exports = router;