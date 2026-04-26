import { AuthContext } from "../auth.context";
import { useContext, useEffect } from "react";
import {
  getMe,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/auth.api";

export const useAuth = () => {
  // This custom hook provides an easy way to access the authentication context throughout the app.
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  // Function to fetch the current authenticated user's information from the backend.
  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const userData = await loginUser({ email, password });
      setUser(userData.user);
      setLoading(false);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ userName, email, password }) => {
    setLoading(true);
    try {
      const userData = await registerUser({ userName, email, password });
      setUser(userData.user);
      setLoading(false);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
      setLoading(false);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Simulate an API call to check if the user is authenticated
    const getAuthStatus = async () => {
      try {
        // Example: Check if a token exists in localStorage
        const data = await getMe();
        setUser(data?.user ?? null); // Set user data if available, otherwise null
      } catch (error) {
        console.error("Error fetching user information:", error);
        setUser(null); // Clear user state on error (e.g., token invalid/expired)
      } finally {
        setLoading(false);
      }
    };
    getAuthStatus();
  }, []);

  return { user, loading, handleLogin, handleRegister, handleLogout };
};
