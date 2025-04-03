import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван',
  })
  first_name: string;

  @ApiProperty({
    description: 'Фамилия пользователя',
    example: 'Иванов',
  })
  last_name: string;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'user@example.com',
    format: 'email',
  })
  email: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: 'P@ssw0rd123',
  })
  password: string;
}

export const CreateUserSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});
