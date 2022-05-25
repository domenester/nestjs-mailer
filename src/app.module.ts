import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { ProviderModule } from './provider/provider.module';

const {JWT_SECRET} = process.env

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
    }),
    ProviderModule
  ],
  providers: [
    AppService,
    JwtStrategy
  ],
})
export class AppModule {}
