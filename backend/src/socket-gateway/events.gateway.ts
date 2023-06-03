import { HttpException, HttpStatus, Inject, Injectable, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
@Injectable()
export class EventsGateway {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private extractTokenFromHeader(
    request: Request & { headers: { authorization: string } },
  ): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string): string {
    return data;
  }

  @WebSocketServer()
  server: Server;

  @UseGuards(AuthGuard('jwt'))
  handleConnection(client: any) {
    const accessToken = this.extractTokenFromHeader(client.handshake);
    try {
      this.jwtService.verify(accessToken, {
        secret: this.configService.get('JWT_SECRET'),
      });
      console.log(`Client connected: ${client.id}`);
    } catch (error) {
      console.error([
        '💥 ~ file: events.gateway.ts:60 ~ EventsGateway ~ handleConnection ~ error:',
        error,
      ]);
      this.server.to(client.id).emit('events', 'Unauthorized');
      client.disconnect();
    }
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected');
  }

  broadcastEvent(event: string, payload: any) {
    this.server.emit(event, payload);
  }
}
