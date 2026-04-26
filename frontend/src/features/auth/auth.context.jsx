import { createContext, useState } from "react";
import { getMe } from "../auth/services/auth.api";

// Create a context for authentication. This will allow us to share auth state across the app without prop drilling.
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // This state will hold the authenticated user's information, null as default when no user is logged in.
  const [user, setUser] = useState(null);
  // Tracks loading state for auth operations (login, logout, fetching user).
  // - true  → request in progress (show spinner, disable buttons)
  // - false → idle or complete
  // Also used to hydrate user data on initial app load.
  const [loading, setLoading] = useState(true);


  return (
    // Provide the user and loading state, along with their setters, to the rest of the app via context.
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
