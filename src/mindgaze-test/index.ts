import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { BlogCheckService } from './services';

@Module({
    imports: [
        EventEmitterModule.forRoot(),
        ScheduleModule.forRoot(),
    ],
    providers: [BlogCheckService],
    exports: [BlogCheckService],
})
export class MindgazeModule {}

export { BlogCheckService } from './services';