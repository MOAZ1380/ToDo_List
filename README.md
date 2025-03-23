# To-Do List Application

## Overview

The **To-Do List Application** is a robust and scalable task management system designed to help users organize their tasks efficiently. Built with **Node.js**, **Express**, and **MongoDB**, this application provides a RESTful API for managing tasks, lists, and users. It includes features like user authentication, task prioritization, list management, and more. The application is designed with a focus on security, scalability, and maintainability.

## Features

- **User Authentication**: Secure user registration, login, and password reset functionality using JWT (JSON Web Tokens).
- **Task Management**: Create, read, update, and delete tasks with options to set priority, status, and due dates.
- **List Management**: Organize tasks into lists, with the ability to create, update, and delete lists.
- **User Roles**: Differentiate between regular users and admins with role-based access control.
- **File Uploads**: Users can upload profile pictures using Multer.
- **Email Verification**: Users receive an OTP via email for account verification and password reset.
- **Error Handling**: Centralized error handling with custom error messages and status codes.
- **Validation**: Robust input validation using `express-validator` to ensure data integrity.
- **Pagination & Sorting**: Efficiently fetch data with pagination and sorting options.
- **Logging**: Request logging using `morgan` for development purposes.

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB (with Mongoose for ODM)
- **Authentication**: JWT, bcryptjs
- **File Upload**: Multer
- **Email Service**: Nodemailer
- **Validation**: express-validator
- **Logging**: morgan
- **Environment Variables**: dotenv

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/todo-list-app.git
   cd todo-list-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   DB_URI=mongodb://localhost:27017/todo-app
   JWT_SECRET=your_jwt_secret
   EMAIL_HOST=smtp.example.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

4. **Run the application**:
   ```bash
   npm start
   ```

5. **Access the API**:
   The API will be running on `http://localhost:4000`.

## API Endpoints

### Authentication
- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Log in and receive a JWT.
- **POST /api/auth/forgetPassword**: Request a password reset OTP.
- **POST /api/auth/resetPassword**: Reset password using OTP.

### Users
- **GET /api/user**: Get all users (Admin only).
- **GET /api/user/:id**: Get a specific user by ID.
- **POST /api/user**: Create a new user (Admin only).
- **PUT /api/user/:id**: Update a user.
- **DELETE /api/user/:id**: Delete a user.

### Lists
- **GET /api/list**: Get all lists for the authenticated user.
- **GET /api/list/:id**: Get a specific list by ID.
- **POST /api/list**: Create a new list.
- **PUT /api/list/:id**: Update a list.
- **DELETE /api/list/:id**: Delete a list and its associated tasks.

### Tasks
- **GET /api/task**: Get all tasks for a specific list.
- **GET /api/task/:id**: Get a specific task by ID.
- **POST /api/task**: Create a new task.
- **PUT /api/task/:id**: Update a task.
- **DELETE /api/task/:id**: Delete a task.

## CV Project Points

1. **Developed a Full-Stack To-Do List Application**:
   - Designed and implemented a RESTful API using Node.js, Express, and MongoDB.
   - Integrated user authentication with JWT and role-based access control.
   - Implemented features like task prioritization, list management, and email verification.

2. **Implemented Advanced Error Handling and Validation**:
   - Created a centralized error-handling middleware to manage API errors effectively.
   - Used `express-validator` for robust input validation to ensure data integrity and security.

3. **Optimized Performance and Scalability**:
   - Implemented pagination, sorting, and filtering for efficient data retrieval.
   - Utilized Mongoose for database operations, ensuring optimized queries and data consistency.
   - Integrated file uploads using Multer and email services via Nodemailer for enhanced user experience.
