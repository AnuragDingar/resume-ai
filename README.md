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



- axios installed







---

For deeper implementation details see [details.md](./details.md).
