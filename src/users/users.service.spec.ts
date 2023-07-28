import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should return the user when a valid username is provided', async () => {
    const userService = new UsersService();
    const existingUsername = 'maria';
    const result = await userService.findOne(existingUsername);
    expect(result).toBeDefined();
    expect(result?.username).toEqual(existingUsername);
  });

  it('should return undefined when the user does not exist', async () => {
    const userService = new UsersService();
    const nonExistingUsername = 'non_existing_username';
    const result = await userService.findOne(nonExistingUsername);
    expect(result).toBeUndefined();
  });

  it('should return undefined when the username is undefined', async () => {
    const userService = new UsersService();
    const undefinedUsername = undefined;
    const result = await userService.findOne(undefinedUsername);
    expect(result).toBeUndefined();
  });

  it('should return undefined when an empty username is provided', async () => {
    const userService = new UsersService();
    const emptyUsername = '';
    const result = await userService.findOne(emptyUsername);
    expect(result).toBeUndefined();
  });
});
