# Backend README

Express TypeScript API for the Full Stack Task Manager.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- Zod validation
- JWT authentication
- bcrypt password hashing
- cors and helmet

## Folder Structure

```text
src/
  config/
  controllers/
  middlewares/
  models/
  routes/
  services/
  validations/
  utils/
  app.ts
  server.ts
```

## Run Locally

```bash
npm install
cp .env.example .env
npm run dev
```

The API runs on `http://localhost:5000` by default.

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/full_stack_task_manager
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
```

## API Documentation

### Signup

`POST /api/auth/signup`

Body:

```json
{
  "name": "Alex Carter",
  "email": "alex@example.com",
  "password": "password123"
}
```

### Login

`POST /api/auth/login`

Body:

```json
{
  "email": "alex@example.com",
  "password": "password123"
}
```

### Create Task

`POST /api/tasks`

Headers:

```http
Authorization: Bearer token_here
```

Body:

```json
{
  "title": "Prepare README",
  "description": "Add setup and deployment notes"
}
```

### Get Tasks

`GET /api/tasks?page=1&limit=10&search=readme&status=all`

Query params:

- `page`: page number, default `1`
- `limit`: items per page, default `10`, max `50`
- `search`: title or description search
- `status`: `all`, `pending`, or `completed`

### Update Task Status

`PATCH /api/tasks/:id`

Body:

```json
{
  "status": "completed"
}
```

### Delete Task

`DELETE /api/tasks/:id`

## Deployment on Render

1. Create a new Web Service.
2. Set root directory to `backend`.
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Add environment variables from `.env.example`.
6. Use MongoDB Atlas for `MONGODB_URI`.
