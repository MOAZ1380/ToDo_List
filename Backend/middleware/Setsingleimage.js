const multer = require('multer');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utlis/ApiError');
const bcrypt = require('bcryptjs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `User_${Date.now()}.${ext}`;
        cb(null, fileName);
    }
});


const fileFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
        return cb(new ApiError(400, 'Only Images allowed'), false);
    }
    cb(null, true);
};


const upload = multer({storage: storage, fileFilter: fileFilter});


const SetSingleImage = asyncHandler(async (req, res, next) => {
    
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    upload.single('avatar')(req, res, function (err) {
        
        if (err instanceof multer.MulterError) {
            return next(new ApiError(400, err.message));
        } else if (err) {
            return next(new ApiError(400, err.message));
        }
        if (!req.file) {
            return next();
        }

        req.body.avatar = req.file.filename;
        next();
    });
});


module.exports = SetSingleImage;
