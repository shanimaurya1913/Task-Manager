# Frontend README

Next.js frontend for the Full Stack Task Manager.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- React hooks
- Axios

## Features

- Signup and login pages
- Protected task dashboard
- Create tasks
- Search tasks with debounce
- Filter by status
- Server-side pagination
- Mark pending/completed
- Delete tasks
- Logout
- Responsive UI

## Run Locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Folder Structure

```text
app/
  login/
  signup/
  tasks/
components/
  auth/
  common/
  tasks/
lib/
types/
```

## Deployment on Vercel

1. Import the GitHub repository in Vercel.
2. Set root directory to `frontend`.
3. Add `NEXT_PUBLIC_API_URL` with the deployed backend URL, for example:

   ```env
   NEXT_PUBLIC_API_URL=https://your-api.onrender.com/api
   ```

4. Deploy.
