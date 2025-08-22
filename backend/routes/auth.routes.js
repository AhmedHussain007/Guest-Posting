const express = require('express');
const { Signup,Login} = require('../controllers/auth.controller');
const router = express.Router();

router.post('/login', Login);
router.post('/signup', Signup);

module.exports = router;
