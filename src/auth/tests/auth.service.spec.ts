import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('should return an access token when valid username and password are provided', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      const user = { userId: 1, username, password };

      jest.spyOn(usersService, 'findOne').mockResolvedValueOnce(user);
      jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValueOnce('mockedAccessToken');

      const result = await authService.signIn(username, password);

      expect(result).toEqual({ access_token: 'mockedAccessToken' });
      expect(usersService.findOne).toHaveBeenCalledWith(username);
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        sub: user.userId,
        username: user.username,
      });
    });

    it('should throw UnauthorizedException when invalid username or password is provided', async () => {
      const username = 'nonexistentuser';
      const password = 'invalidpassword';

      jest.spyOn(usersService, 'findOne').mockResolvedValueOnce(null);

      await expect(authService.signIn(username, password)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(usersService.findOne).toHaveBeenCalledWith(username);
    });

    it('should throw UnauthorizedException when incorrect password is provided', async () => {
      const username = 'testuser';
      const password = 'incorrectpassword';
      const user = { userId: 1, username, password: 'correctpassword' };

      jest.spyOn(usersService, 'findOne').mockResolvedValueOnce(user);

      await expect(authService.signIn(username, password)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(usersService.findOne).toHaveBeenCalledWith(username);
    });
  });
});
