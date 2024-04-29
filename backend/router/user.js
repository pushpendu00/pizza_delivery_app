const middleware = require('../middleware/middleware');

const router = require('express').Router();


router.post('/',require('../controllers/userController').user);


router.use('/cart',require('./cart'));


router.use('/order',require('./order'));

module.exports = router;