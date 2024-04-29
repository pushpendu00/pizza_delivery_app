
const middleware = require('../middleware/middleware');

const router = require('express').Router();

router.post('/create-orderid',require('../controllers/orderController').create_ordet_id);

router.post('/create-order', middleware, require('../controllers/orderController').create_order);


module.exports = router;



// const router = require('express').Router();





// module.exports = router;