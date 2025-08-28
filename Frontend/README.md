# To-Do List Application - Frontend

## Overview

The frontend of the **To-Do List Application** is a modern, responsive single-page application (SPA) built with **React**, **Vite**, and **Tailwind CSS**. It provides an intuitive user interface for interacting with the backend API, allowing users to manage tasks, lists, and their accounts. The frontend is designed for performance, accessibility, and a seamless user experience.

## Features

- **User Authentication**: Pages for sign-up, sign-in, password reset, and email verification.
- **List Management**: Create, update, delete, and view lists with pagination and search functionality.
- **Task Management**: Create, update, delete, and mark tasks as completed or uncompleted, with priority-based styling.
- **Responsive Design**: Fully responsive UI using Tailwind CSS, optimized for desktop and mobile devices.
- **Routing**: Client-side routing with `react-router-dom` for seamless navigation.
- **Error Handling**: Displays meaningful error messages for failed API requests.
- **State Management**: Uses React hooks (`useState`, `useEffect`) for managing state and side effects.

## Technologies Used

- **React**: JavaScript library for building the user interface.
- **Vite**: Fast build tool and development server with Hot Module Replacement (HMR).
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **react-router-dom**: Client-side routing for navigation.
- **axios**: HTTP client for making API requests.
- **ESLint**: Linting for maintaining code quality.
- **@tailwindcss/vite**: Vite plugin for Tailwind CSS integration.

## Installation

1. **Navigate to the Frontend directory**:

   ```bash
   cd Frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Access the application**: Open `http://localhost:5173` in your browser.

## Project Structure

- `src/`:

  - `features/`: Contains feature-specific components, pages, and services.
    - `auth/`: Authentication-related components (`AuthLayout.jsx`) and pages (`SignIn.jsx`, `SignUp.jsx`, etc.).
    - `lists/`: List management pages (`lists.jsx`) and services (`listApi.js`).
    - `tasks/`: Task management pages (`Uncompleted.jsx`, `Completed.jsx`) and services (`tasksAPi.js`).
  - `routes/`: Routing configuration (`AppRoutes.jsx`).
  - `App.jsx`: Main app component that renders the router.
  - `main.jsx`: Entry point for rendering the React application.
  - `index.css`: Global styles with Tailwind CSS imports.
  - `App.css`: Additional app-specific styles.

- `public/`: Static assets like the Vite favicon.

- `eslint.config.js`: ESLint configuration for code quality.

- `vite.config.js`: Vite configuration with React and Tailwind CSS plugins.

- `package.json`: Project dependencies and scripts.

## Available Scripts

- `npm run dev`: Starts the development server with HMR.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm run preview`: Previews the production build locally.

## Integration with Backend

The frontend communicates with the backend API running at `http://localhost:4000`. Ensure the backend server is running before starting the frontend. The API services are defined in:

- `src/features/auth/services/authApi.js`: Handles authentication requests.
- `src/features/lists/services/listApi.js`: Handles list-related requests.
- `src/features/tasks/services/tasksAPi.js`: Handles task-related requests.

The frontend uses `axios` to send HTTP requests with JWT tokens stored in `localStorage` for authentication.

## Running Tests

Currently, no automated tests are implemented. To add tests, consider using a testing framework like Jest or Vitest with React Testing Library.
