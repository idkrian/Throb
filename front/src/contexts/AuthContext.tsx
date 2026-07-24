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
import {
  getMe,
  login as loginRequest,
  register as registerRequest,
  updateMe,
} from "@/api/auth";
import type { AuthUser, UnitPreference, UpdateMeDto } from "@/dtos/auth.dto";
import {
  applyAuthHeader,
  clearSession,
  getStoredToken,
  getStoredUser,
  isTokenValid,
  persistSession,
  persistUser,
} from "@/utils/auth";

interface AuthContextValue {
  user: AuthUser | null;
  /** Falls back to KG until the profile loads, so weights always render. */
  unit: UnitPreference;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  updateProfile: (data: UpdateMeDto) => Promise<void>;
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

  const updateProfile = useCallback(async (data: UpdateMeDto) => {
    const updated = await updateMe(data);
    persistUser(updated);
    setSession((prev) => ({ ...prev, user: updated }));
  }, []);

  // Sessions stored before the profile fields existed lack unitPreference, so the
  // profile is re-synced from the server whenever a valid token is present.
  useEffect(() => {
    if (!isTokenValid(token)) return;
    getMe()
      .then((freshUser) => {
        persistUser(freshUser);
        setSession((prev) => ({ ...prev, user: freshUser }));
      })
      .catch(() => {
        // 401s are already handled by the interceptor below.
      });
  }, [token]);

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
      unit: user?.unitPreference ?? "KG",
      isAuthenticated: isTokenValid(token),
      login,
      register,
      updateProfile,
      logout,
    }),
    [user, token, login, register, updateProfile, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
