import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { authService } from "../services/authService";

type UseAuth = {
  isAuthenticated: boolean;
  isVerified: boolean;
  login: (verified?: boolean) => void;
  logout: () => void;
};

export const useAuth = (): UseAuth => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    authService.isAuthenticated()
  );
  const [isVerified, setIsVerified] = useState(authService.isVerified());
  const navigate = useNavigate();

  const login = (verified: boolean = true) => {
    authService.login(verified);
    setIsAuthenticated(true);
    setIsVerified(verified);
    navigate({ to: "/invites" });
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setIsVerified(false);
    navigate({ to: "/" });
  };

  return {
    isAuthenticated,
    isVerified,
    login,
    logout,
  };
};
