import { v4 as uuidv4 } from 'uuid';
import { User, UserInput } from '../model';
import { AuthRepository } from '../repository/repository';

export class MockAuthRepository implements AuthRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async create(data: UserInput): Promise<User> {
    const newUser: User = {
      ...data,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);

    return newUser;
  }

  async clear(): Promise<void> {
    this.users = [];
  }
}
