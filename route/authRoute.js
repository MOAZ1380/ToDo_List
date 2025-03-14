const express = require('express');
const router = express.Router();
const  verifyToken  = require('../middleware/verifyToken');
const { 
    Signup,
    VerifyCode,
    Login,
    ForgetPassword,
    ResetPassword
    } = require('../services/authService');



router.route('/signup')
    .post(Signup)
    
router.route('/VerifySignup')
    .post(VerifyCode)

router.route('/Login')
    .post(Login)

router.route('/ForgetPassword')
    .post(ForgetPassword)

router.route('/VerifyForgetPassword')
    .post(VerifyCode)

router.route('/ResetPassword')
    .post(verifyToken, ResetPassword)

    
    

module.exports = router;
