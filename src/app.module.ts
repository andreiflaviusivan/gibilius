import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MindgazeModule } from './mindgaze-test';

@Module({
  imports: [MindgazeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
