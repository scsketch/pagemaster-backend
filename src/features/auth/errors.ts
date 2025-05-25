// Service
export class ServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export class LoginError extends ServiceError {
  constructor(message: string) {
    super(message);
    this.name = 'LoginError';
  }
}

export class SignupError extends ServiceError {
  constructor(message: string) {
    super(message);
    this.name = 'SignupError';
  }
}

export class UserExistsError extends ServiceError {
  constructor(email: string) {
    super(`An account with email ${email} already exists`);
    this.name = 'UserExistsError';
  }
}

export class LogoutError extends ServiceError {
  constructor(message: string) {
    super(message);
    this.name = 'LogoutError';
  }
}

// Repository
export class RepositoryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}
