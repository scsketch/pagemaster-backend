// Service
export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export class LoginError extends AuthError {
  constructor(message: string) {
    super(message);
    this.name = 'LoginError';
  }
}

export class SignupError extends AuthError {
  constructor(message: string) {
    super(message);
    this.name = 'SignupError';
  }
}

export class UserExistsError extends AuthError {
  constructor(email: string) {
    super(`User with email ${email} already exists`);
    this.name = 'UserExistsError';
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor(message: string = 'Invalid email or password') {
    super(message);
    this.name = 'InvalidCredentialsError';
  }
}

export class LogoutError extends AuthError {
  constructor(message: string) {
    super(message);
    this.name = 'LogoutError';
  }
}

// Repository
export class RepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RepositoryError';
  }
}
