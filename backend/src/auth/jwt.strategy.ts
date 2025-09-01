import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

type JwtPayload = { sub: string; email: string; name?: string };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly cfg: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: cfg.get<string>('JWT_SECRET', 'dev_secret'),
    });

    const secret = cfg.get<string>('JWT_SECRET') || 'dev_secret';
  }

  async validate(payload: JwtPayload) {
    return { userId: payload.sub, email: payload.email, name: payload.name };
  }
}

const __keepConfigServiceAsValue = ConfigService;
