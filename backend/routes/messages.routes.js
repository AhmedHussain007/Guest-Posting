const express = require('express');
const { getMessages, sendMessage, getAdminMessages} = require('../controllers/messages.controller');
const router = express.Router();
const isAuth = require('../middlewares/auth.middleware');

router.get('/', isAuth, getMessages);
router.post('/', isAuth, sendMessage);
router.get('/admin/', isAuth, getAdminMessages);

module.exports = router;
