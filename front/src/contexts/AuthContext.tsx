import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import { login as loginRequest, register as registerRequest } from "@/api/auth";
import type { AuthUser } from "@/dtos/auth.dto";
import {
  applyAuthHeader,
  clearSession,
  getStoredToken,
  getStoredUser,
  isTokenValid,
  persistSession,
} from "@/utils/auth";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const bootstrap = (): { token: string | null; user: AuthUser | null } => {
  const token = getStoredToken();
  if (!isTokenValid(token)) {
    clearSession();
    return { token: null, user: null };
  }
  applyAuthHeader(token);
  return { token, user: getStoredUser() };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [{ token, user }, setSession] = useState(bootstrap);

  const logout = useCallback(() => {
    clearSession();
    applyAuthHeader(null);
    setSession({ token: null, user: null });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { token: newToken, ...authUser } = await loginRequest({
      email,
      password,
    });
    persistSession(newToken, authUser);
    applyAuthHeader(newToken);
    setSession({ token: newToken, user: authUser });
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      await registerRequest({ name, email, password });
      await login(email, password);
    },
    [login],
  );

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) logout();
        return Promise.reject(error);
      },
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, [logout]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: isTokenValid(token),
      login,
      register,
      logout,
    }),
    [user, token, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
