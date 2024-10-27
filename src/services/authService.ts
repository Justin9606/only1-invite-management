const AUTH_KEY = "isAuthenticated";
const VERIFIED_KEY = "isVerified";

export const authService = {
  isAuthenticated: (): boolean => localStorage.getItem(AUTH_KEY) === "true",

  isVerified: (): boolean => localStorage.getItem(VERIFIED_KEY) === "true",

  login: (verified: boolean = true) => {
    localStorage.setItem(AUTH_KEY, "true");
    localStorage.setItem(VERIFIED_KEY, verified ? "true" : "false");
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(VERIFIED_KEY);
  },
};
