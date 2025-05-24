export interface User {
  id: number;
  userId: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
}
