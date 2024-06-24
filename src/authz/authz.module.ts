import { Module } from '@nestjs/common';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), UsersModule],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: AuthGuard('jwt'),
    },
  ],
  exports: [PassportModule],
})
export class AuthzModule {}
