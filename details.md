# Project Dev Notes

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

---

## Backend Notes

- Added middleware: `jwt.verify` used to extract data from the token.
- Install axios for HTTP requests.

---

## Frontend Notes

- `npm create vite@latest .` — scaffolds Vite app directly into the `frontend/` folder (`.` means files go directly inside, no nested subfolder).
- `scss` used for styling; installed via `npm i sass`.
- `npm i react-router` added for client-side routing.
- All page content lives inside `<main></main>` tags (e.g. `Login.jsx`).
- `useNavigate` hook used to switch between Register and Login pages.
- axios used
    - in auth.api.js  we use {
        withCredentials: true
    }

    with this server can read and write in cookies.

- // Create a context for authentication. This will allow us to share auth state across the app without prop drilling.
export const AuthContext = createContext();
-     // This custom hook provides an easy way to access the authentication context throughout the app.
    const context = useContext(AuthContext);
- we created Protected component -     // This component is a wrapper for routes that require authentication. It checks if the user is authenticated and either renders the child components or redirects to the login page.
and we add that page in this component like this -   {
    path: "/",
    element: <Protected><h1>Home Page</h1></Protected>,
  },

### Frontend Architecture (4-layer)

| Layer | Purpose | Files |
|-------|---------|-------|
| UI | Components and pages | `components/`, `pages/` |
| Hook | State and API management | `hooks/` |
| State | Frontend data store | `auth.context.jsx`, `ai.context.jsx` |
| API | Frontend–backend connection | `services/auth.api.js` |
