# 🔥 DevBoard – API for Task Management System 

- Build a production-ready REST API for a task management system where users can organize projects and tasks like a simplified Trello.

## 🚀 Tech Stack
- Node.js + Express.js – Server and routing

- MongoDB + Mongoose – Database and schema modeling

- JWT (JSON Web Tokens) – Authentication & Authorization

- bcrypt.js – Secure password hashing

## 🧩 API Overview

### 🔐 Auth & API Key:
- POST /auth/register → Register a user
- POST /auth/login → Login with email/password, return JWT
- POST /auth/api-key → Generate API key for authenticated user
- GET /auth/me → Get current user details

## 📁 Project Routes
- POST /projects → Create project
- GET /projects → List all user’s projects
- GET /projects/:id → Get project by ID
- PUT /projects/:id → Update project
- DELETE /projects/:id → Delete project

## ✅ Task Routes:
- POST /projects/:projectId/tasks → Create task
- GET /projects/:projectId/tasks → List all tasks for project
- PUT /tasks/:id → Update task status, title, description
- DELETE /tasks/:id → Delete task

## ⚙️ Project Setup

### 1. Clone the Repository

```bash
https://github.com/arjunsaxena122/dev_board.git
cd dev_board
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

- Duplicate .env.example as .env and update the values as needed.

### 4. Run Database via Docker

DevBoard includes a Docker configuration for MongoDB. Start the database with:

```bash
docker-compose up -d
```

### 5. Run the Server

```bash
pnpm run dev
```

Server will start on http://localhost:3000

## 🎯 End Goal

To create a fully working Express.js API that supports:

- User registration and login (JWT-based authentication)
- API Key generation for secure API usage
- CRUD operations for Projects & Tasks
- Proper handling of project-task-user relationships
- Postman collection demonstrating all routes and workflows
- Production-ready code with modular structure and environment configuration
