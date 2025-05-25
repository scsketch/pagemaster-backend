import { User, UserInput } from '../model';

export interface AuthRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: UserInput): Promise<User>;
}
