import { Module } from '@nestjs/common';
import { HomeController } from './controllers';

@Module({
    controllers: [
        HomeController
    ],
    providers: [],
    exports: [],
})
export class UiModule {}
