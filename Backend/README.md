# To-Do List Application - Backend

## Overview

The backend of the **To-Do List Application** is a robust and scalable RESTful API built with **Node.js**, **Express**, and **MongoDB**. It provides endpoints for user authentication, task management, list management, and admin functionalities. The backend is designed with security (JWT, bcrypt), scalability (MongoDB with Mongoose), and maintainability in mind.

## Features

- **User Authentication**: Secure registration, login, password reset, and email verification using JWT and OTP.
- **Task Management**: Create, read, update, and delete tasks with support for priority, status, and due dates.
- **List Management**: Organize tasks into lists with CRUD operations.
- **User Roles**: Role-based access control for regular users and admins.
- **File Uploads**: Support for uploading user profile pictures using Multer.
- **Email Notifications**: OTP-based email verification and password reset using Nodemailer.
- **Validation**: Robust input validation using `express-validator`.
- **Error Handling**: Centralized error handling with custom error messages.
- **Pagination & Sorting**: Efficient data retrieval with pagination and sorting.
- **Logging**: Request logging using `morgan` in development mode.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for creating the RESTful API.
- **MongoDB**: NoSQL database for storing users, lists, and tasks.
- **Mongoose**: ODM for MongoDB to manage database schemas and queries.
- **JWT**: JSON Web Tokens for secure authentication.
- **bcryptjs**: Password hashing for secure storage.
- **Multer**: Middleware for handling file uploads.
- **Nodemailer**: Email sending for OTP verification and password reset.
- **express-validator**: Input validation for API requests.
- **morgan**: HTTP request logging for development.
- **dotenv**: Environment variable management.

## Installation

1. **Navigate to the Backend directory**:

   ```bash
   cd Backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the `Backend` directory with the following:

   ```env
   DB_URI=mongodb://localhost:27017/todo-app
   JWT_SECRET=your_jwt_secret
   EMAIL_HOST=smtp.example.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   PORT=4000
   NODE_ENV=development
   ```

4. **Run the backend server**:

   ```bash
   npm start
   ```

5. **Access the API**:
   The API will be available at `http://localhost:4000`.

## API Endpoints

### Authentication

- **POST /api/auth/signup**: Register a new user (requires name, email, password).
- **POST /api/auth/VerifySignup**: Verify user account with OTP.
- **POST /api/auth/login**: Log in and receive a JWT.
- **POST /api/auth/ForgetPassword**: Request a password reset OTP.
- **POST /api/auth/VerifyForgetPassword**: Verify OTP for password reset.
- **POST /api/auth/ResetPassword**: Reset password using OTP (requires JWT).

### Users (Admin only)

- **GET /api/user**: Get all users.
- **GET /api/user/:id**: Get a specific user by ID.
- **POST /api/user**: Create a new user.
- **PUT /api/user/:id**: Update a user (supports avatar upload).
- **DELETE /api/user/:id**: Delete a user.

### Lists

- **GET /api/list**: Get all lists for the authenticated user (supports pagination, sorting, and search).
- **GET /api/list/:id**: Get a specific list by ID.
- **POST /api/list**: Create a new list (requires title).
- **PUT /api/list/:id**: Update a list (requires title).
- **DELETE /api/list/:id**: Delete a list and its associated tasks.

### Tasks

- **GET /api/list/:listId/task**: Get all tasks for a specific list (supports pagination, sorting, and search).
- **GET /api/list/:listId/task/completed**: Get all completed tasks for a specific list.
- **GET /api/list/:listId/task/:id**: Get a specific task by ID.
- **POST /api/list/:listId/task**: Create a new task (requires description, optional priority, and status).
- **PUT /api/list/:listId/task/:id**: Update a task (supports updating description, priority, status, and completion).
- **DELETE /api/list/:listId/task/:id**: Delete a task.

## Project Structure

- **`config/`**: Database connection setup (`DBconnection.js`).
- **`middleware/`**: Custom middleware for error handling, token verification, file uploads, and validation.
- **`models/`**: Mongoose schemas for Users, Lists, and Tasks.
- **`route/`**: Express routes for authentication, users, lists, and tasks.
- **`services/`**: Business logic for handling API requests.
- **`utlis/`**: Utilities for error handling and validation.

## Error Handling

- The backend uses a centralized error handling middleware (`errorMiddleware.js`) to catch and format errors.
- Errors return a JSON response with `status`, `message`, and optional `stack` (in development mode).

## Security

- **JWT Authentication**: Protects routes and ensures only authenticated users can access their data.
- **Password Hashing**: Uses bcryptjs to securely hash passwords.
- **Input Validation**: Uses `express-validator` to validate incoming requests.
- **Role-Based Access**: Admin-only routes are restricted using the `allowedTo` middleware.

## Running Tests

Currently, no automated tests are implemented. To add tests, consider using a testing framework like Jest or Mocha.
