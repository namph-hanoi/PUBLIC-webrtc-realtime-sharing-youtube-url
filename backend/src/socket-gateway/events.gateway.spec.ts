import { Test, TestingModule } from '@nestjs/testing';
import { EventsGateway } from './events.gateway';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Server } from 'socket.io';

describe('VideoSharingService', () => {
  let service: EventsGateway;
  let jwtService: JwtService;

  const mockJwtService = () => ({
    verify: jest.fn((randomToken, {}) => ({ email: 'namph.tech@gmail.com' })),
  });

  const mockConfigService = () => ({
    get: jest.fn((jwt_secret) => jwt_secret),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsGateway,
        {
          provide: ConfigService,
          useFactory: mockConfigService,
        },
        {
          provide: JwtService,
          useFactory: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<EventsGateway>(EventsGateway);
    service.server = new Server();
    jwtService = module.get<JwtService>(JwtService);
  });

  it('Assert websocket server connected successfully', () => {
    const mockClient = {
      handshake: {
        headers: {
          authorization: 'Bearer valid_token',
        },
      },
    };

    const verifySpy = jest.spyOn(jwtService, 'verify');

    service.handleConnection(mockClient);

    expect(verifySpy).toHaveBeenCalledWith('valid_token', {
      secret: expect.any(String),
    });
  });

  it('Assert websocket server fail connecting', () => {
    const mockClient = {
      id: 123,
      handshake: {
        headers: {
          authorization: 'Bearer valid_token',
        },
      },
      disconnect: () => undefined,
    };

    const verifySpy = jest
      .spyOn(jwtService, 'verify')
      .mockImplementation(() => {
        throw new Error('Some error message');
      });

    const consoleErrorSpy = jest.spyOn(console, 'error');
    service.handleConnection(mockClient);

    expect(consoleErrorSpy).toHaveBeenCalledWith([
      '💥 ~ file: events.gateway.ts:60 ~ EventsGateway ~ handleConnection ~ error:',
      expect.any(Error),
    ]);
  });
});
