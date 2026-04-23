export type Role = 'admin' | 'user' | string;

export interface User {
  id_user: number;
  username: string;
  email: string;
  userpassword?: string;
  status?: string;
  register_date?: Date;
  id_rol?: number;
  role?: Role;
}

export interface LoginRequest {
  username: string;
  userpassword: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  userpassword: string;
  id_rol: number;
}
