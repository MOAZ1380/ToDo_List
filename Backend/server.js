const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const ApiError = require("./utlis/ApiError");

const globalError = require("./middleware/errorMiddleware");

// Routes
const TaskRoutes = require("./route/TaskRoute");
const ListRoute = require("./route/ListRoute");
const UserRoute = require("./route/UserRoute");
const authRoute = require("./route/authRoute");

// connect to database
const connectDB = require("./config/DBconnection");

// Connect to MongoDB
connectDB();

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173", // السماح فقط للـ frontend
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true, // لو بتبعت كوكيز أو jwt في الـ header
	}),
);
app.use(express.json());

// Logger
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
	console.log(`mode: ${process.env.NODE_ENV}`);
}

// Routes
app.use("/api/task", TaskRoutes);
app.use("/api/list", ListRoute);
app.use("/api/user", UserRoute);
app.use("/api/auth", authRoute);

app.all("*", (req, res, next) => {
	next(new ApiError(400, `Can't find this route: ${req.originalUrl}`));
});

// Error handler
app.use(globalError);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
