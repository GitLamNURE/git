import { NestFactory } from '@nestjs/core';
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

  await app.listen(config.port);
}
bootstrap();
