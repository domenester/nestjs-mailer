import { Module } from '@nestjs/common';
import { ConfigModuleForRoot } from '../config/module.config';
import { ProviderController } from './provider.controller';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';

ConfigModuleForRoot()
const {SENDGRID_API_KEY} = process.env
@Module({
  imports: [
    ConfigModuleForRoot(),
    SendGridModule.forRoot({
      apiKey: SENDGRID_API_KEY,
    }),
  ],
  controllers: [ProviderController],
  providers: [ProviderController],
  exports: [ProviderController]
})
export class ProviderModule {}
