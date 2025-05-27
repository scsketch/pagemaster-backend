import dotenv from 'dotenv';
import path from 'path';

// Load test environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });

// Global test setup
beforeAll(() => {
  // Verify JWT_SECRET is loaded
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured in .env.test file');
  }

  // Suppress console.error during tests
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

// Restore console.error after all tests
afterAll(() => {
  jest.restoreAllMocks();
});
