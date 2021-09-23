import { Module } from '@nestjs/common';
import { PersistenceModule } from '../persistence';
import { TestController } from './controllers';
import { AppService } from './services';

@Module({
  imports: [
    PersistenceModule
  ],
  controllers: [
    TestController
  ],
  providers: [AppService],
  exports: [],
})
export class ApiModule { }
