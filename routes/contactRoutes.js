const router = require('express').Router();
const contactController = require('../controllers/contactController');
const {jwtMiddleware} = require('../jwtAuthenticator');

router.post('/createContact',jwtMiddleware, contactController.createContact);

router.put('/editContact',jwtMiddleware, contactController.updateContact);

router.post('/searchContact', jwtMiddleware, contactController.searchContact);

module.exports = router;