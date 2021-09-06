import { Controller, Get, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from '../services';

@Controller('api/test')
export class TestController {
  constructor(private readonly appService: AppService, private readonly config: ConfigService) {}

  @Get()
  getHello(@Query('name') name: string): string {
    return this.appService.getHello(name);
  }

  @Get('testConfig')
  testConfig(): string {
    return this.config.get('db.sqlite.cucu');
  }
}
