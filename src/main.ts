import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { exceptionFactory } from './pipes/validation.pipe';
import cors from './middleware/cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    exceptionFactory,
  }))
  app.enableCors({origin: true})
  app.use(cors)

  const {PORT} = process.env
  await app.listen(+PORT || 3000);
}
bootstrap();
