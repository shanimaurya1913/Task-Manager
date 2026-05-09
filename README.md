# Full Stack Task Manager

A simple full-stack task management assessment project with separate backend and frontend apps.

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/shanimaurya1913/Task-Manager
cd Task-Manager

## Apps

- `backend`: Node.js, Express, TypeScript, MongoDB, Mongoose, Zod, JWT, bcrypt
- `frontend`: Next.js, TypeScript, Tailwind CSS, Axios, React hooks

## Quick Start

1. Install backend dependencies:

   ```bash
   cd backend
   npm install
   cp .env.example .env
   npm run dev
   ```

2. Install frontend dependencies:

   ```bash
   cd frontend
   npm install
   cp .env.example .env.local
   npm run dev
   ```

3. Open `http://localhost:3000`.

## Environment Variables

Backend:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/full_stack_task_manager
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

Frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## API Summary

All responses use:

```json
{
  "success": true,
  "message": "Message",
  "data": {}
}
```

Errors use:

```json
{
  "success": false,
  "message": "Error message"
}
```

Protected task routes require:

```http
Authorization: Bearer token_here
```

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`

### Tasks

- `POST /api/tasks`
- `GET /api/tasks?page=1&limit=10&search=api&status=all`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`

More details are in [backend/README.md](backend/README.md) and [frontend/README.md](frontend/README.md).

## Deployment Notes

- Frontend is Vercel-ready. Set `NEXT_PUBLIC_API_URL` to the deployed Render API URL plus `/api`.
- Backend is Render-ready. Set `MONGODB_URI` to MongoDB Atlas, `JWT_SECRET` to a strong secret, and `CLIENT_URL` to the deployed Vercel URL.

## GitHub Submission

```bash
git init
git add .
git commit -m "Build full stack task manager"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
