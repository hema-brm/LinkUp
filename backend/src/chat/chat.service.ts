import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async saveMessage(data: {
    content: string;
    username: string;
    color: string;
  }) {
    return this.prisma.message.create({
      data: {
        content: data.content,
        username: data.username,
        color: data.color,
      },
    });
  }

  async getRecentMessages(limit = 50) {
    return this.prisma.message.findMany({
      orderBy: { timestamp: 'asc' },
      take: limit,
    });
  }
}
