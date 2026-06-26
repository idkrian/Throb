export interface AuthUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface RegisterRequestDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponseDto extends AuthUser {
  token: string;
}

export interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}
