import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';
import { UsersService } from 'src/users/users.service';
import { UserProfile } from 'src/users/model/user-profile';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.ISSUER_BASE_URL}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: process.env.AUDIENCE,
      issuer: `${process.env.ISSUER_BASE_URL}/`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any): Promise<UserProfile> {
    return await this.userService.findOne(payload.sub);
  }
}
