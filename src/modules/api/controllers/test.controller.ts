import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from '../services';
// import { BlogCheckService } from './modules/mindgaze-test';
// , private readonly blogTestService: BlogCheckService

@Controller('api/test')
export class TestController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Query('name') name: string): string {
    return this.appService.getHello(name);
  }
}
