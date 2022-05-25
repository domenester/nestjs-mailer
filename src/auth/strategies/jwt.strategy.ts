import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigModuleForRoot } from '../../config/module.config';

ConfigModuleForRoot()
const {JWT_SECRET} = process.env

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<any> {
    const {JWT_SECRET} = process.env
    const { secret } = payload;
    if (secret !== JWT_SECRET) {
      throw new UnauthorizedException();
    }
    return {secret};
  }
}
