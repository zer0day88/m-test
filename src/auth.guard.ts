import { CanActivate, ExecutionContext, Injectable, UnauthorizedException,
  ForbiddenException,} from '@nestjs/common';
import { AppService } from "./app.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly appServ : AppService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization }: any = request.headers;
      if (!authorization || authorization.trim() === '') {
        throw new UnauthorizedException('Please provide token');
      }
      const authToken = authorization.trim();
      const resp = await this.appServ.validateToken(authToken)
      request.decodedData = resp;
      return true;
    } catch (error) {
      console.log('auth error - ', error.message);
      throw new ForbiddenException(error.message || 'session expired! Please sign In');
    }
  }
}