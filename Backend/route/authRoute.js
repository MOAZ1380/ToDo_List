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

const {
    signUpValidator,
    ResetPasswordValidator,
} = require('../utlis/validator/AuthValidator');



router.route('/signup')
    .post(signUpValidator, Signup)
    
router.route('/VerifySignup')
    .post(VerifyCode)

router.route('/Login')
    .post(Login)

router.route('/ForgetPassword')
    .post(ForgetPassword)

router.route('/VerifyForgetPassword')
    .post(VerifyCode)

router.route('/ResetPassword')
    .post(verifyToken, ResetPasswordValidator , ResetPassword)

    
    

module.exports = router;
