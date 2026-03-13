import React, { createContext, useContext, useState, useCallback } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<string>;
  verifyOtp: (email: string, otp: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = sessionStorage.getItem("hw_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    const u: User = {
      id: crypto.randomUUID(),
      name: email.split("@")[0],
      email,
      role: email.includes("admin") ? "admin" : "user",
    };
    setUser(u);
    sessionStorage.setItem("hw_user", JSON.stringify(u));
    return true;
  }, []);

  const register = useCallback(async (_name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    return email;
  }, []);

  const verifyOtp = useCallback(async (email: string, otp: string) => {
    await new Promise((r) => setTimeout(r, 600));
    if (otp.length === 6) {
      const u: User = {
        id: crypto.randomUUID(),
        name: email.split("@")[0],
        email,
        role: email.includes("admin") ? "admin" : "user",
      };
      setUser(u);
      sessionStorage.setItem("hw_user", JSON.stringify(u));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    sessionStorage.removeItem("hw_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
