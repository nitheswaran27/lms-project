import { createContext, useContext, useState, type ReactNode } from "react";

export type UserRole = "student" | "admin" | null;

interface User {
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const ADMIN_CREDENTIALS = { email: "admin@learnhub.com", password: "admin123" };

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("lms_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, password: string, role: UserRole): boolean => {
    if (role === "admin") {
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        const adminUser = { name: "Admin", email, role: "admin" as UserRole };
        setUser(adminUser);
        localStorage.setItem("lms_user", JSON.stringify(adminUser));
        return true;
      }
      return false;
    }

    // Student login - check registered users
    const users = JSON.parse(localStorage.getItem("lms_registered_users") || "[]");
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (found) {
      const studentUser = { name: found.name, email: found.email, role: "student" as UserRole };
      setUser(studentUser);
      localStorage.setItem("lms_user", JSON.stringify(studentUser));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("lms_registered_users") || "[]");
    if (users.find((u: any) => u.email === email)) return false;
    users.push({ name, email, password });
    localStorage.setItem("lms_registered_users", JSON.stringify(users));
    const studentUser = { name, email, role: "student" as UserRole };
    setUser(studentUser);
    localStorage.setItem("lms_user", JSON.stringify(studentUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("lms_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
