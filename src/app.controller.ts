import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto, CreateUserSchema } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JoiValidationPipe } from './pipes/ValidationPipe';

@Controller()
export class AppController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
    private readonly appService: AppService,
  ) {}
  @Post('auth/register')
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  register(@Body() CreateUserDto: CreateUserDto) {
    return this.usersService.register(CreateUserDto);
  }

  @UseGuards(AuthGuard('local')) //(new (AuthGuard('local')))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/refresh')
  async refresh(@Body() body) {
    const { userId, refresh_token } = body;
    return this.authService.refreshToken(userId, refresh_token);
  }

  @Post('auth/logout')
  async logout(@Body() body) {
    const { userId } = body;
    return this.authService.logout(userId);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
