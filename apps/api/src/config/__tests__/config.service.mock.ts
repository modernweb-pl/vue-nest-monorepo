import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Config } from '../index';

export const configServiceMock = (config: Partial<Config>): Provider => ({
  provide: ConfigService,
  useValue: new ConfigService(config),
});
