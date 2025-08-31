// src/contexts/AuthContext.tsx
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as authApi from "../services/auth.service";
import type { User } from "../services/auth.service";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function safeParseUser(raw: string | null): User | null {
  if (!raw) return null;
  try {
    const p = JSON.parse(raw);
    if (p && typeof p === "object" && typeof p.id === "string") return p as User;
  } catch {}
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const clearAuth = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  }, []);

  useEffect(() => {
    const t = localStorage.getItem("auth_token");
    const u = safeParseUser(localStorage.getItem("auth_user"));
    if (t) setToken(t);
    if (u) setUser(u);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!token || user) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const u = await authApi.me();
        if (!cancelled) {
          setUser(u);
          localStorage.setItem("auth_user", JSON.stringify(u));
        }
      } catch {
        if (!cancelled) clearAuth();
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token, user, clearAuth]);

  const persist = useCallback((u: User, t: string) => {
    setUser(u);
    setToken(t);
    localStorage.setItem("auth_token", t);
    localStorage.setItem("auth_user", JSON.stringify(u));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const { token } = await authApi.login({ email, password });
      localStorage.setItem("auth_token", token);
      setToken(token);
      const u = await authApi.me();
      persist(u, token);
    } finally {
      setLoading(false);
    }
  }, [persist]);

  const register = useCallback(async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const { user, token } = await authApi.register({ name, email, password });
      persist(user, token);
    } finally {
      setLoading(false);
    }
  }, [persist]);

  const logout = useCallback(() => {
    clearAuth();
  }, [clearAuth]);

  const value = useMemo<AuthContextValue>(() => ({
    user, token, loading, login, register, logout
  }), [user, token, loading, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
