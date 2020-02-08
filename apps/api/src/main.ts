import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO configure allowed origins
  app.enableCors();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
