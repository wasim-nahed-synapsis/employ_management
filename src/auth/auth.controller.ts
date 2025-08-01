import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../user/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Post('register')
  async register(@Body() body: { firstName: string, lastName: string, email: string, password: string }) {
    const user = await this.usersService.create(body.firstName, body.lastName, body.email, body.password);
    return { message: 'Registration successful', user };
  }

  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) return { message: 'Invalid credentials' };
    return this.authService.login(user);
  }

  @Post('logout')
  async logout() {
    return this.authService.logout();
  }

}
