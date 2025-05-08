import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChatGateway } from './chat/chat.gateway';
import { PrismaModule } from './database/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [    
    ConfigModule.forRoot({
    isGlobal: true,
  }),
  AuthModule, 
  UserModule,
  JwtModule, 
  PrismaModule, 
  ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
