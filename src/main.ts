import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Allow CORS
  app.enableCors({
    origin: '*', // For production: replace * with frontend URL
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();


