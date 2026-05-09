# Full Stack Task Manager

A simple full-stack task management assessment project with separate backend and frontend apps.

## Tech Stack

### Backend
Node.js, Express, TypeScript, MongoDB, Mongoose, Zod, JWT, bcrypt

### Frontend
Next.js, TypeScript, Tailwind CSS, Axios, React hooks

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd full-stack-task-manager

Example:

git clone https://github.com/your-username/full-stack-task-manager.git
cd full-stack-task-manager
Apps
backend - Node.js Express API
frontend - Next.js client app
Backend Setup
1. Go to backend folder
cd backend
2. Install backend dependencies
npm install
3. Create environment file
cp .env.example .env
4. Add backend environment variables
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/full_stack_task_manager
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
5. Start backend server
npm run dev

Backend will run on:

http://localhost:5000
Frontend Setup

Open a new terminal from the project root.

1. Go to frontend folder
cd frontend
2. Install frontend dependencies
npm install
3. Create environment file
cp .env.example .env.local
4. Add frontend environment variable
NEXT_PUBLIC_API_URL=http://localhost:5000/api
5. Start frontend app
npm run dev

Frontend will run on:

http://localhost:3000
Quick Start

Run backend:

cd backend
npm install
cp .env.example .env
npm run dev

Run frontend:

cd frontend
npm install
cp .env.example .env.local
npm run dev

Open:

http://localhost:3000
Environment Variables
Backend
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/full_stack_task_manager
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
Frontend
NEXT_PUBLIC_API_URL=http://localhost:5000/api
API Summary

All successful responses use:

{
  "success": true,
  "message": "Message",
  "data": {}
}

Errors use:

{
  "success": false,
  "message": "Error message"
}

Protected task routes require:

Authorization: Bearer token_here
Auth APIs
POST /api/auth/signup
POST /api/auth/login
Task APIs
POST /api/tasks
GET /api/tasks?page=1&limit=10&search=api&status=all
PATCH /api/tasks/:id
DELETE /api/tasks/:id

More details are available in:

backend/README.md
frontend/README.md
Deployment Notes
Frontend

The frontend is Vercel-ready.

Set this environment variable in Vercel:

NEXT_PUBLIC_API_URL=https://your-render-backend-url.com/api
Backend

The backend is Render-ready.

Set these environment variables in Render:

MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=https://your-vercel-frontend-url.com
GitHub Submission
git init
git add .
git commit -m "Build full stack task manager"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main

For your assignment README, this is better because evaluator ko direct samajh aayega:

1. repository clone kaise karna hai  
2. backend kaise run karna hai  
3. frontend kaise run karna hai  
4. environment variables kaha add karne hain  
5. GitHub submission kaise karna hai
