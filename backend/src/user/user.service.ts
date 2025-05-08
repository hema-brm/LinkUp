import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException("Utilisateur non trouvé");
    }

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({});
  }

  async updateColor(userId: string, color: string) {
    if (!/^#?[0-9A-Fa-f]{6}$/.test(color)) {
      throw new BadRequestException("La couleur n'est pas valide.");
    }

    const hexColor = color.startsWith('#') ? color : `#${color}`;

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { color: hexColor },
    });

    return updatedUser;
  }


}
