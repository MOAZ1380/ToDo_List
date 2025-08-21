const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
	Signup,
	VerifySignup,
	Login,
	ForgetPassword,
	ResetPassword,
	VerifyPassword,
} = require("../services/authService");

const {
	signUpValidator,
	ResetPasswordValidator,
} = require("../utlis/validator/AuthValidator");

router.route("/signup").post(signUpValidator, Signup);

router.route("/VerifySignup").post(VerifySignup);

router.route("/Login").post(Login);

router.route("/ForgetPassword").post(ForgetPassword);

router.route("/VerifyForgetPassword").post(VerifyPassword);

router
	.route("/ResetPassword")
	.post(verifyToken, ResetPasswordValidator, ResetPassword);

module.exports = router;
