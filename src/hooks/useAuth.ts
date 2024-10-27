import { useState } from "react";

interface UseAuth {
  isAuthenticated: boolean;
  isVerified: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuth = (): UseAuth => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
    setIsVerified(true); // Set this to true if the user is verified
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsVerified(false);
  };

  return {
    isAuthenticated,
    isVerified,
    login,
    logout,
  };
};
