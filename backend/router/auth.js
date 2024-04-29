const router = require('express').Router();


router.post('/register',require('../controllers/authController').register);

router.post('/login',require('../controllers/authController').login);


module.exports = router;