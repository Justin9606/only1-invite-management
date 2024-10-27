import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { authService } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  const handleLogin = () => {
    authService.login(true); // Log in and set the user as verified
    login(); // Update the auth state in useAuth
    navigate({ to: "/invites" }); // Redirect to invite management page
  };

  if (isAuthenticated) {
    navigate({ to: "/invites" });
    return null; // Avoid rendering login page if already authenticated
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <button
          onClick={handleLogin}
          className="w-full py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Login;