import { AuthService } from '../service';
import { MockAuthRepository } from './mock.repository';

export class AuthTestFactory {
  private mockRepository: MockAuthRepository;
  private authService: AuthService;

  constructor() {
    this.mockRepository = new MockAuthRepository();
    this.authService = new AuthService(this.mockRepository);
  }

  getService(): AuthService {
    return this.authService;
  }

  getRepository(): MockAuthRepository {
    return this.mockRepository;
  }

  async clearDatabase(): Promise<void> {
    await this.mockRepository.clear();
  }
}
