import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { ApiModule } from './modules/api';
import { AppConfigModule } from './modules/app-config';
import { MindgazeModule } from './modules/mindgaze-test';
import { UiModule } from './modules/ui';

@Module({
  imports: [
    MindgazeModule, 
    ApiModule,
    RouterModule.register([
      {
        path: 'api',
        module: ApiModule,
      }
    ]),
    UiModule,
    AppConfigModule
    ],
  controllers: [],
  providers: [],
})
export class AppModule {}
