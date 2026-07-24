import axios from "axios";
import type {
  AuthUser,
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  UpdateMeDto,
} from "@/dtos/auth.dto";

const AUTH_URL = `${import.meta.env.VITE_API_BASE}/auth`;
const USER_URL = `${import.meta.env.VITE_API_BASE}/user`;

export const login = async (
  data: LoginRequestDto,
): Promise<LoginResponseDto> => {
  const response = await axios.post(`${AUTH_URL}/login`, data);
  return response.data.data;
};

export const register = async (data: RegisterRequestDto): Promise<AuthUser> => {
  const response = await axios.post(USER_URL, data);
  return response.data.data;
};

export const getMe = async (): Promise<AuthUser> => {
  const response = await axios.get(`${USER_URL}/me`);
  return response.data.data;
};

export const updateMe = async (data: UpdateMeDto): Promise<AuthUser> => {
  const response = await axios.patch(`${USER_URL}/me`, data);
  return response.data.data;
};
