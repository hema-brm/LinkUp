import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import config from '../config/config';
import { UserService } from 'src/user/user.service';

@WebSocketGateway({
  cors: {
    origin: config.frontendUrl,
    credentials: false,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private connectedUsers = new Set<string>([]);
  @WebSocketServer()
  server: Server;

  constructor(
    private jwtService: JwtService,
    private chatService: ChatService,
    private userService: UserService
  ) {}

  handleConnection(client: Socket) {
    const token = client.handshake.auth?.token;

    try {
      const payload = this.jwtService.verify(token);
      const username = payload?.username;
      
      if (!username) {
        console.warn("Connexion refusée : username manquant");
        return client.disconnect();
      }

      client.data.user = payload;
      this.connectedUsers.add(username);
 
      this.server.emit('connected_users', Array.from(this.connectedUsers));
      client.broadcast.emit('user_connected', username);

      console.log(`Client connecté : ${username}`);
    } catch {
      console.warn('Connexion refusée (JWT invalide)');
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const user = client.data.user;
    if (user?.username) {
      this.connectedUsers.delete(user.username);
      client.broadcast.emit('user_disconnected', user.username);
      console.log(`Client déconnecté : ${user.username}`);
    }
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() content: string,
    @ConnectedSocket() client: Socket,
  ) {
    const user = client.data.user;
    if (!user) return;

    const dbUser = await this.userService.findById(user.userId);

    const message = {
      content,
      username: user.username,
      color: dbUser?.color || '#ccc',
      timestamp: new Date().toISOString(),
    };

    await this.chatService.saveMessage(message);

    this.server.emit('message', message);
  }

  @SubscribeMessage('typing')
  handleTyping(@ConnectedSocket() client: Socket) {
    const user = client.data.user;
    if (user?.username) {
      client.broadcast.emit('typing', user.username);
    }
  }
}
