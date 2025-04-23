import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });
    return {
      access_token,
      refresh_token,
    };
  }

  async refreshToken(refresh_token: string) {
    let user;
    try {
      const decoded = this.jwtService.verify(refresh_token);
      user = await this.usersService.findById(decoded.sub);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = { email: user.email, sub: user.id };
    const new_access_token = this.jwtService.sign(payload, { expiresIn: '15m' });
    const new_refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      access_token: new_access_token,
      refresh_token: new_refresh_token,
    };
  }

  async logout(token: string) {
    return { message: 'User logged out successfully' };
  }
}
