import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const { isAuthenticated, login } = useAuth();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = () => {
    const isVerifiedUser = isValidEmail(email);
    login(isVerifiedUser);
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
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
