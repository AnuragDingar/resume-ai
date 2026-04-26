import React, {useState} from "react";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router";

const Register = () => {

  // useNavigate is a hook from react-router that allows us to programmatically navigate to different routes in our app.
  const navigate = useNavigate();

  const  { handleRegister } = useAuth();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    handleRegister({ userName, email, password });
    navigate("/"); // Redirect to home page after registration
  };

  return (
    <main>
      <div className="form-container">
        <h1>Register Page</h1>
        {/* Add your login form here */}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="button primary-button">
            Register
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
