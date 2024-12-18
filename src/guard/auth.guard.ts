import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split(' ')?.[1];
      if (!token) {
        throw new UnauthorizedException();
      }

      const payload = await this.jwtService.verify(token, {
        publicKey: String(process.env.JWT_ACCESS_KEY),
      });

      request['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }

    return true;
  }
}
