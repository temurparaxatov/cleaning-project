import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/users/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDto.email);
    if (user) {
      return new BadRequestException('Bu user Mavjud!');
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 7);
    const newUser = this.userService.create({
      ...createUserDto,
      password: hashPassword,
    });

    const token = await this.createToken(newUser);
    return {
      register: 'success',
      token,
    };
  }

  async signin(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByEmail(loginUserDto.email);
    if (!user) {
      return new UnauthorizedException('Login yoki parol xato!');
    }

    const compared = await bcrypt.compare(loginUserDto.password, user.password);
    if (!compared) {
      return new UnauthorizedException('Login yoki parol xato!');
    }

    const token = await this.createToken(user);
    return {
      login: 'success',
      token,
    };
  }

  async createToken(data) {
    const payload = {
      sub: data.id,
      email: data.email,
      active: data.isActive,
    };
    const token = await this.jwtService.signAsync(payload);
    console.log(token);

    return token;
  }
}
