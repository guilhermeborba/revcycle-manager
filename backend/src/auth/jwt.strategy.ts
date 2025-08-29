import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly cfg: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: cfg.get<string>('JWT_SECRET') || 'dev-secret',
    });

     
    console.log(
      '[JWT] strategy ready (secret len =',
      (cfg.get<string>('JWT_SECRET') || 'dev-secret').length,
      ')',
    );
  }

  async validate(payload: { sub: string; email: string }) {
     
    console.log('[JWT] validate payload =', payload);
    return { userId: payload.sub, email: payload.email };
  }
}
 
const __keepConfigServiceAsValue = ConfigService;
