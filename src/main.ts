import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotFoundExceptionFilter } from './filters/not-found-exception.fllter';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { connectionSource } from './config/typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appCode = 'vehicles-api';
  app.setGlobalPrefix(appCode);
  const config = new DocumentBuilder()
    .setTitle('Vehicle System API')
    .setDescription('Routes to manage vehicles')
    .setVersion('1.0')
    .addTag('vehicles')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${appCode}/swagger`, app, documentFactory);

  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.enableCors();
  app.use(
    helmet(),
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  );
  await connectionSource.initialize();
  await app.listen(5000);
}
bootstrap();
