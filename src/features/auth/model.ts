export interface User {
  userId: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserSignupResult = Omit<User, 'password'>;
export type UserLoginResult = Omit<User, 'password'>;

export interface LoginInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: Omit<User, 'password'>;
}

export interface UserInput {
  email: string;
  password: string;
}
