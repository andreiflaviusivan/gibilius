import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { BlogCheckService } from './mindgaze-test';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly blogTestService: BlogCheckService) {}

  @Get()
  getHello(@Query('name') name: string): string {
    return this.appService.getHello(name);
  }
}
