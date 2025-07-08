// import { Injectable } from '@nestjs/common';
// import { UsersService } from '../user/users.service';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthService {
//   constructor(
//     private usersService: UsersService,
//     private jwtService: JwtService
//   ) {}

//   async validateUser(email: string, pass: string): Promise<any> {
//     const user = await this.usersService.findByEmail(email);
    
//     if (user && await bcrypt.compare(pass, user.password)) {
//       return {
//         id: user['_id'],
//         email: user['email'],
//       };
//     }

//     return null;
//   }

//   async login(user: any) {
//     const payload = { email: user.email, sub: user.id }; // use user.id
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }


import { Injectable } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...rest } = user.toJSON(); // No toObject needed
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      message: 'Login successful',
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout() {
    return { message: 'Logout successful' }; // No token invalidation in stateless JWT
  }

}
