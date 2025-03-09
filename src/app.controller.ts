import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AppService} from "./app.service";
import { CreateUserDto } from "./users/dto/create-user.dto";
import {UsersService} from "./users/users.service";
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth/auth.service";

@Controller()
export class AppController {
  constructor(
      private readonly usersService: UsersService,
      private authService: AuthService,
      private readonly appService: AppService
  ) {}
  @Post('auth/register')
  register(@Body() CreateUserDto: CreateUserDto) {
    return this.usersService.register(CreateUserDto);
  }

  @UseGuards(AuthGuard('local')) //(new (AuthGuard('local')))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
