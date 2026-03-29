# Resume Project API

## Overview

A REST API built with **Node.js** and **Express** for user authentication. Users register and log in with email and password, receiving a **JWT token stored in a cookie**. Logout is enforced through **token blacklisting** in MongoDB, ensuring a logged-out token cannot be reused.

---

## Technologies Used

- **Node.js** — JavaScript runtime
- **Express.js** — Web framework
- **MongoDB Atlas** — Cloud-hosted NoSQL database
- **Mongoose** — ODM for MongoDB
- **JWT (JSON Web Tokens)** — Stateless authentication (expires in 1 day)
- **bcryptjs** — Password hashing
- **cookie-parser** — Cookie handling middleware
- **dotenv** — Environment variable management

---

## Project Structure

```
resumeProject/
├── src/
│   ├── app.js                     # Express app setup and middleware
│   ├── config/
│   │   └── database.js            # MongoDB connection
│   ├── controller/
│   │   └── auth.controller.js     # Auth logic (register, login, logout)
│   ├── models/
│   │   ├── user.model.js          # User schema
│   │   └── blacklist.model.js     # Blacklisted token schema
│   └── routes/
│       └── auth.routes.js         # Auth route definitions
├── server.js                      # Entry point
├── .env                           # Environment variables (not committed)
└── package.json
```

---

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd resumeProject
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (see [Configuration](#configuration)).

4. Start the development server:

   ```bash
   npm run dev
   ```

---

## Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=<your-mongodb-atlas-connection-string>
JWT_SECRET=<your-jwt-secret-key>
```

| Variable | Description |
|----------|-------------|
| `PORT` | Port the server listens on. Defaults to `3000` if not set. |
| `MONGO_URI` | MongoDB Atlas connection string with your password substituted in. |
| `JWT_SECRET` | Secret key used to sign and verify JWT tokens. |

---

## Running the Application

**Development** (auto-restart via `nodemon`):

```bash
npm run dev
```

---

## API Endpoints

All routes are prefixed with `/api/auth`.

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Log in and receive a JWT cookie | No |
| GET | `/api/auth/logout` | Log out and invalidate the token | No* |

> \* Logout is public — if no token cookie is present, it simply clears the cookie and responds successfully. If a token is present, it is added to the blacklist.

---

## Authentication

- **Token delivery**: JWT is set as a cookie (`token`) on successful register or login. It expires in **1 day**.
- **Register** requires `username`, `email`, and `password` in the request body.
- **Login** requires `email` and `password`.

---

## Token Blacklisting

On logout, the JWT is saved to the `BlacklistToken` collection in MongoDB. This prevents the token from being reused even if someone else has a copy of it. The general server-side approach (clearing the cookie) does not protect against this — blacklisting does.

Redis is the preferred solution for high-throughput scenarios; this project uses MongoDB for simplicity.

---

## Error Handling

| Status Code | Meaning |
|-------------|---------|
| 200 | Success |
| 201 | User created |
| 400 | Bad request (missing fields, duplicate username/email, invalid credentials) |
| 500 | Internal server error |

---

## Testing with Postman

### 1. Register

- **Method**: `POST`
- **URL**: `http://localhost:3000/api/auth/register`
- **Body** (JSON):

  ```json
  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "yourpassword"
  }
  ```

### 2. Login

- **Method**: `POST`
- **URL**: `http://localhost:3000/api/auth/login`
- **Body** (JSON):

  ```json
  {
    "email": "test@example.com",
    "password": "yourpassword"
  }
  ```

  The JWT is returned as a `token` cookie automatically.

### 3. Logout

- **Method**: `GET`
- **URL**: `http://localhost:3000/api/auth/logout`

  Ensure Postman has cookie handling enabled so the `token` cookie is sent with the request.



----
added middleware - jwt.verify used to get data out from token