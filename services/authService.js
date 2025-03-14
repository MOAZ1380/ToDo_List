const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utlis/ApiError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
require('dotenv').config();


// Check if user is allowed to access route
exports.allowedTo = asyncHandler(async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return next(
          new ApiError(403, 'You are not allowed to access this route')
        );
    }
    next();
});

// Generate token
const generateToken = (user, expired) => {
    return jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: expired,
    });
};


// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();


// Send verification email
const sendVerificationEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    const mailOptions = {
        from: `"TO_DO_LIST" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify Your Account",
        text: `Your verification code is: ${otp}. It is valid for 2 minutes.`,
    };

    await transporter.sendMail(mailOptions);
};



// @desc    Signup
// @route   GET /api/auth/signup
// @access  Public
exports.Signup = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new ApiError(400, "User already exists"));
    
    const otp = generateOTP();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        verificationCode: otp,
        isVerified: false,
        otpExpire: new Date(Date.now() + 2 * 60 * 1000), 
      });

    await newUser.save();
    await sendVerificationEmail(email, otp);

    res.status(201).json({ message: "Your account has been created. Please check your email for verification code." });
});


// @desc    VerifyCode
// @route   GET /api/auth/Verify
// @access  Public
exports.VerifyCode = asyncHandler(async (req, res, next) => {
    const { otp } = req.body;
    if (!otp) {
        return next(new ApiError(400, "Please provide verification code"));
    }
    const user = await User.findOne({ verificationCode: otp });

    if (!user) {
        return next(new ApiError(400, "Invalid verification code"));
    }

    if (user.otpExpire < new Date()) {
        return next(new ApiError(400, "Verification code has expired. Please sign up again."));
    }

    user.isVerified = true;
    user.verificationCode = null;
    user.otpExpire = null;
    await user.save();

    let expire;

    if (req.route.path === '/api/auth/VerifySignup') {
        expire = '7d';
    } else {
        expire = '1m'; 
    }

    const token = generateToken(user, expire);

    return res.status(200).json({ message: "Account verification has been successful", user, token });
});



// @desc    Login
// @route   GET /api/auth/login
// @access  Public
exports.Login = asyncHandler(async (req, res, next) => {
    console.log(req.route.path);

    const { email, password } = req.body;

    const user = await User.findOne({ email })
    if (!user) return next(new ApiError(400, "User not found"));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ApiError(400, "password is incorrect"));

    const token = generateToken(user, '7d');

    res.status(200).json({ message: "Login successful", user, token });
})


// @desc    ForgetPassword
// @route   GET /api/auth/ForgetPassword
// @access  Public
exports.ForgetPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(new ApiError(400, "User not found"));

    const otp = generateOTP();
    user.verificationCode = otp;
    user.otpExpire = new Date(Date.now() + 2 * 60 * 1000);
    await user.save();

    await sendVerificationEmail(email, otp);
    res.status(200).json({ message: "Please check your email for verification code" });
});


// @desc    Login
// @route   GET /api/auth/ResetPassword
// @access  private
exports.ResetPassword = asyncHandler(async (req, res, next) => {
    const { newpassword, renewpassword } = req.body;

    const user = await User.findOne({ email: req.user.email });
    if (!user) return next(new ApiError(400, "User not found"));

    if (newpassword !== renewpassword) {
        return next(new ApiError(400, "Passwords do not match"));
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedPassword;
    user.passwordChangedAt = new Date();
    await user.save();

    const token = generateToken(user, '7d');

    res.status(200).json({ message: "Password reset successful" , token });
});