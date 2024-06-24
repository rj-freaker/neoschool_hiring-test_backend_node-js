const router = require('express').Router();
const {jwtMiddleware} = require('../jwtAuthenticator');
const userController = require('../controllers/userController');

router.post('/signup' , userController.signup);

router.post('/login', userController.signIn);

router.get('/profile', jwtMiddleware, userController.profile);

module.exports = router;
