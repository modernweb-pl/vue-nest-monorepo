import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const globalPrefix = config.get('globalPrefix');
  const port = config.get('port');

  app.enableCors(config.get('cors'));
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
