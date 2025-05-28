import { AuthTestFactory } from './auth.factory';
import { InvalidCredentialsError, LoginError, UserExistsError } from '../errors';

describe('AuthService', () => {
  let authFactory: AuthTestFactory;

  beforeEach(() => {
    authFactory = new AuthTestFactory();
  });

  afterEach(async () => {
    await authFactory.clearDatabase();
  });

  describe('signup', () => {
    const testUser = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should create a new user successfully', async () => {
      // Arrange
      const service = authFactory.getService();

      // Act
      const result = await service.signup(testUser);

      // Assert
      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe(testUser.email);
      expect(result.user).not.toHaveProperty('password');
      expect(result.user).toHaveProperty('id');
      expect(result.user).toHaveProperty('createdAt');
      expect(result.user).toHaveProperty('updatedAt');
    });

    it('should throw UserExistsError when email already exists', async () => {
      // Arrange
      const service = authFactory.getService();
      await service.signup(testUser);

      // Act
      const signupPromise = service.signup(testUser);

      // Assert
      await expect(signupPromise).rejects.toThrow(UserExistsError);
    });

    it('should hash the password before storing', async () => {
      // Arrange
      const service = authFactory.getService();
      const repository = authFactory.getRepository();

      // Act
      await service.signup(testUser);
      const storedUser = await repository.findByEmail(testUser.email);

      // Assert
      expect(storedUser).not.toBeNull();
      expect(storedUser?.password).not.toBe(testUser.password);
      expect(storedUser?.password).toMatch(/^\$2[aby]\$\d+\$/); // bcrypt hash format
    });
  });

  describe('login', () => {
    const testUser = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should login successfully with valid credentials', async () => {
      // Arrange
      const service = authFactory.getService();
      await service.signup(testUser);

      // Act
      const result = await service.login(testUser.email, testUser.password);

      // Assert
      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result.user.email).toBe(testUser.email);
      expect(result.user).not.toHaveProperty('password');
    });

    it('should throw InvalidCredentialsError with wrong password', async () => {
      // Arrange
      const service = authFactory.getService();
      await service.signup(testUser);

      // Act
      const loginPromise = service.login(testUser.email, 'wrongpassword');

      // Assert
      await expect(loginPromise).rejects.toThrow(InvalidCredentialsError);
    });

    it('should throw InvalidCredentialsError with non-existent email', async () => {
      // Arrange
      const service = authFactory.getService();

      // Act
      const loginPromise = service.login('nonexistent@example.com', 'password123');

      // Assert
      await expect(loginPromise).rejects.toThrow(InvalidCredentialsError);
    });
  });
});
