import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: "Le nom d'utilisateur ne peut pas être vide." })
  username: string;

  @IsNotEmpty({ message: "L'email ne peut pas être vide." })
  @IsEmail({}, { message: 'Le mail doit être valide.' })
  email: string;

  @IsString({ message: 'Le mot de passe est requis.' })
  @MinLength(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères.',
  })
  password: string;
}
