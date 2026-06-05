# Bloggy - MERN Blog App

A full-stack MERN web application for creating and managing blog posts. Write posts, manage your content from a personal dashboard, and browse posts from all users.

---

## Features

- **Browse Posts** - View all posts from all users on the home feed, sorted by newest
- **User Authentication** - Register and login with JWT-based auth, passwords hashed with bcrypt
- **Create Posts** - Write and publish posts with a title and body
- **Edit & Delete Posts** - Manage your own posts from your dashboard
- **User Dashboard** - View all your posts in one place with edit and delete controls
- **Protected Routes** - Auth-gated pages redirect unauthenticated users
- **Guest Routes** - Login/Register pages redirect already-authenticated users

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| React Router DOM | 7 | Client-side routing |
| Tailwind CSS | 4 | Utility-first styling |
| Vite | 8 | Build tool and dev server |
| Biome | 2 | Linter and formatter |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | - | Runtime |
| Express | 5 | HTTP server and routing |
| MongoDB + Mongoose | 9 | Database and ODM |
| JSON Web Token | 9 | Authentication tokens |
| bcryptjs | 3 | Password hashing |
| dotenv | 17 | Environment variable loading |
| nodemon | 3 | Dev server auto-restart |

---

## Project Structure

```
Bloggy/
├── client/                   # React + Vite app
│   ├── src/
│   │   ├── components/       # Reusable UI components (Post, Alert, Success)
│   │   ├── contexts/         # React context (UserContext, PostContext)
│   │   ├── controllers/      # Fetch API wrappers (posts, users)
│   │   ├── pages/            # Route-level page components
│   │   │   ├── posts/        # Home, Create, Update pages
│   │   │   └── users/        # Login, Register, Dashboard pages
│   │   └── routes/           # AuthRoutes and GuestRoutes guards
│   └── index.html
│
└── server/                   # Express + MongoDB API
    ├── controllers/          # Route handler logic
    ├── middlewares/          # JWT auth middleware
    ├── models/               # Mongoose schemas (User, Post)
    ├── routes/               # API route definitions
    ├── utils/                # DB connection helper
    └── server.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)

### 1. Clone the repository

```bash
git clone <repo-url>
cd Bloggy
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_here
```

Start the backend:

```bash
npm start        # production
npm run dev      # development (auto-restart with nodemon)
```

### 3. Set up the frontend

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_BACKEND_URL=http://localhost:5000
```

Start the dev server:

```bash
npm run dev
```

App runs at **http://localhost:5173**

---

## Available Scripts

### Frontend

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |

### Backend

| Script | Description |
|---|---|
| `npm start` | Start server with node |
| `npm run dev` | Start server with nodemon (auto-restart) |

---

## API Endpoints

### Auth - `/api/users`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login, returns JWT | No |

### Posts - `/api/posts`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/` | Get all posts | No |
| GET | `/user` | Get current user's posts | Yes |
| POST | `/` | Create a new post | Yes |
| PUT | `/:id` | Update a post by ID | Yes |
| DELETE | `/:id` | Delete a post by ID | Yes |

> Auth endpoints require `Authorization: Bearer <token>` header.

---

## Environment Variables

### Backend (`server/.env`)

| Variable | Description |
|---|---|
| `PORT` | Server port (default `5000`) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWTs |

### Frontend (`client/.env`)

| Variable | Description |
|---|---|
| `VITE_BACKEND_URL` | Backend base URL (e.g. `http://localhost:5000`) |

---

## License

MIT
