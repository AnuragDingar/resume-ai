import axios from "axios";

const api = axios.create({
  baseURL: "/",
  withCredentials: true,
});

export const registerUser = async ({ userName, email, password }) => {
  try {
    const response = await api.post("/api/auth/register", {
      username: userName,
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.get("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await api.get("/api/auth/get-me");
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Unauthorized, user is not authenticated
      return null;
    }
    console.error("Error fetching user information:", error);
    throw error;
  }
};
