const express = require('express');
const { Signup, Login, verifyUser, forgotPassword, resetPassword, createVerification, me} = require('../controllers/auth.controller');
const router = express.Router();
const isAuth = require('../middlewares/auth.middleware');

router.post('/login', Login);
router.post('/signup', Signup);
router.get('/verify/:token', verifyUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post('/verify', isAuth, createVerification);
router.get("/me", isAuth, me);

module.exports = router;
