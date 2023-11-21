import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should return JWT token on successful login', async () => {
      const signInDto = { username: 'testuser', password: 'testpassword' };
      jest
        .spyOn(authService, 'signIn')
        .mockResolvedValueOnce({ access_token: 'mockedAccessToken' });

      const result = await authController.signIn(signInDto);

      expect(result).toEqual({ access_token: 'mockedAccessToken' });
      expect(authService.signIn).toHaveBeenCalledWith(
        signInDto.username,
        signInDto.password,
      );
    });

    it('should return 401 status code on failed login with invalid credentials', async () => {
      const signInDto = {
        username: 'nonexistentuser',
        password: 'invalidpassword',
      };
      jest
        .spyOn(authService, 'signIn')
        .mockRejectedValueOnce(new UnauthorizedException());

      await expect(authController.signIn(signInDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(authService.signIn).toHaveBeenCalledWith(
        signInDto.username,
        signInDto.password,
      );
    });
  });
});
