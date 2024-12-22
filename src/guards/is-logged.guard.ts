import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/modules/user/user.entity';
import { Repository } from 'typeorm';

interface Decoded {
  id: number;
  userName: string;
  password: string;
}

@Injectable()
export class IsLoggedGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>, // @InjectRepository(Subscription)
  ) // private subscriptionRepository: Repository<Subscription>,
  { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { token } = request.headers;
      if (!token) throw new BadRequestException('Token no obtenido');

      const secretKey = process.env.JWTKEY as string;
      const verify = jwt.verify(token as string, secretKey) as Decoded;
      // process.env.LOGS&&console.log(verify);
      if (!verify) throw new UnauthorizedException('Token no admitido');

      const user = await this.userRepository.findOne({
        where: { id: verify.id },
      });

      if (!user) throw new UnauthorizedException('Token invalido');

      request.user = user;
      return true;
    } catch (error: any) {
      process.env.LOGS && console.log(error);
      throw new BadRequestException(error.message);
    }
  }
}
