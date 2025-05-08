import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); 
  
  app.enableCors({
    origin: config.frontendUrl,
    credentials: false,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
