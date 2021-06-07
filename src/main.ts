import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

import { AppModule } from './app.module';
import { config } from './config';

async function bootstrap() {
  await mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('git');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('GitLam git service')
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('git/swagger', app, swaggerDocument);

  await app.listen(config.port);
}
bootstrap();
