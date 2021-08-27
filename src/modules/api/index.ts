import { Module } from '@nestjs/common';
import { TestController } from './controllers';
import { AppService } from './services';

@Module({
    imports: [
    ],
    controllers:[
        TestController
    ],
    providers: [AppService],
    exports: [],
})
export class ApiModule {}
