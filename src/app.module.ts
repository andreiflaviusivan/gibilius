import { Module } from '@nestjs/common';
import { ApiModule } from './modules/api';
import { MindgazeModule } from './modules/mindgaze-test';
import { UiModule } from './modules/ui';

@Module({
  imports: [MindgazeModule, ApiModule, UiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
