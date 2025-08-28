# To-Do List Application

## Overview

The **To-Do List Application** is a full-stack task management system designed to help users efficiently organize and manage their tasks. It features a **React** frontend with a modern, responsive UI and a **Node.js** backend with a RESTful API, powered by **Express** and **MongoDB**. The application supports user authentication, task prioritization, list management, and more, with a focus on security, scalability, and maintainability.

This repository contains both the frontend and backend codebases, organized in separate directories: `Frontend` and `Backend`. Below is an overview of the project structure and instructions for setting up and running the application.

## Project Structure

- **`Frontend`**: Contains the React-based client-side application built with Vite and Tailwind CSS. It provides a user-friendly interface for interacting with the API.
- **`Backend`**: Contains the Node.js-based server-side application built with Express and MongoDB. It provides a RESTful API for managing users, lists, and tasks.

## Features

- **User Authentication**: Secure registration, login, password reset, and email verification using JWT and OTP.
- **Task Management**: Create, read, update, and delete tasks with support for priority, status, and due dates.
- **List Management**: Organize tasks into customizable lists.
- **User Roles**: Role-based access control for regular users and admins.
- **File Uploads**: Support for uploading user profile pictures.
- **Responsive UI**: A modern, responsive frontend built with React and Tailwind CSS.
- **Pagination & Sorting**: Efficient data retrieval with pagination and sorting options.
- **Error Handling**: Robust error handling with meaningful messages for both frontend and backend.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB** (running locally or via a cloud provider like MongoDB Atlas)
- **Git** (for cloning the repository)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MOAZ1380/todo-list-app.git
   cd todo-list-app
   ```

2. **Set up the Backend**:

   - Navigate to the `Backend` directory:
     ```bash
     cd Backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `Backend` directory with the following variables:
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
   - Start the backend server:
     ```bash
     npm start
     ```
   - The backend API will be available at `http://localhost:4000`.

3. **Set up the Frontend**:
   - Navigate to the `Frontend` directory:
     ```bash
     cd ../Frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```
   - The frontend will be available at `http://localhost:5173`.

## Running the Application

1. Ensure MongoDB is running (locally or via a cloud service).
2. Start the backend server (`npm start` in the `Backend` directory).
3. Start the frontend development server (`npm run dev` in the `Frontend` directory).
4. Open `http://localhost:5173` in your browser to access the application.

## API Documentation

The backend provides a RESTful API with the following endpoints:

- **Authentication**:

  - `POST /api/auth/signup`: Register a new user.
  - `POST /api/auth/login`: Log in and receive a JWT.
  - `POST /api/auth/forgetPassword`: Request a password reset OTP.
  - `POST /api/auth/resetPassword`: Reset password using OTP.

- **Users** (Admin only):

  - `GET /api/user`: Get all users.
  - `GET /api/user/:id`: Get a specific user.
  - `POST /api/user`: Create a new user.
  - `PUT /api/user/:id`: Update a user.
  - `DELETE /api/user/:id`: Delete a user.

- **Lists**:

  - `GET /api/list`: Get all lists for the authenticated user.
  - `GET /api/list/:id`: Get a specific list.
  - `POST /api/list`: Create a new list.
  - `PUT /api/list/:id`: Update a list.
  - `DELETE /api/list/:id`: Delete a list and its tasks.

- **Tasks**:
  - `GET /api/list/:listId/task`: Get all tasks for a specific list.
  - `GET /api/list/:listId/task/:id`: Get a specific task.
  - `POST /api/list/:listId/task`: Create a new task.
  - `PUT /api/list/:listId/task/:id`: Update a task.
  - `DELETE /api/list/:listId/task/:id`: Delete a task.

For detailed API documentation, refer to the `Backend/README.md`.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.
