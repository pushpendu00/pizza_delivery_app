
const router = require('express').Router();


router.get('/past-order',require('../controllers/adminController').past_order);

router.get('/current-order',require('../controllers/adminController').current_order);

router.post('/update-order-status',require('../controllers/adminController').update_status);


module.exports = router;