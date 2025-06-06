import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { RegisterDto } from './dto/register.dto';
import { UserEntity } from '../user/entities/user.entity';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { stringToColor } from 'src/utils/color.util';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(user: any) {
    const payload = {
      userId: user.id,
      username: user.username,
      email: user.email,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: RegisterDto): Promise<UserEntity> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException(
        'Un utilisateur avec cet e-mail existe déjà.',
      );
    }

    const existingUserByUsername = await this.prisma.user.findUnique({
      where: { username: createUserDto.username },
    });

    if (existingUserByUsername) {
      throw new ConflictException('Ce nom d’utilisateur est déjà pris.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const userColor = stringToColor(createUserDto.username);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        color: userColor,
        password: hashedPassword,
      },
    });

    return plainToInstance(UserEntity, user);
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user)
      throw new UnauthorizedException('Email ou mot de passe incorrect.');

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword)
      throw new UnauthorizedException('Email ou mot de passe incorrect.');

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
