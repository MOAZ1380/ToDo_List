const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: [50, "Name cannot be more than 50 characters"],
			minlength: [3, "Name cannot be less than 3 characters"],
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			maxlength: [50, "Email cannot be more than 50 characters"],
			minlength: [3, "Email cannot be less than 3 characters"],
		},
		password: {
			type: String,
			required: true,
			trim: true,
			maxlength: [100, "Password cannot be more than 50 characters"],
			minlength: [3, "Password cannot be less than 3 characters"],
		},
		list_id: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "List",
			},
		],
		role: {
			type: String,
			default: "user",
			enum: ["user", "admin"],
		},
		avatar: {
			type: String,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		verificationCode: {
			type: String,
		},
		otpExpire: {
			type: Date,
		},
		passwordChangedAt: {
			type: Date,
		},
	},
	{ timestamps: true },
);

UserSchema.pre("find", function () {
	this.populate("list_id");
	this.select("-password -verificationCode -otpExpire -passwordChangedAt -__v");
});

UserSchema.pre("findOne", function () {
	this.populate("list_id");
	this.select(" -verificationCode -otpExpire -passwordChangedAt -__v");
});

module.exports = mongoose.model("User", UserSchema);
