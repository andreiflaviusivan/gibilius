import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import DocumentStore from 'ravendb';
import { PersistenceService, TestDto } from 'src/modules/persistence';
import { AppService } from '../services';

@Controller('test')
export class TestController {
  constructor(private readonly appService: AppService, private readonly config: ConfigService, private readonly persistence: PersistenceService) {}

  @Get()
  getHello(@Query('name') name: string): string {
    return this.appService.getHello(name);
  }

  @Get('testConfig')
  testConfig(): string {
    return this.config.get('db.sqlite.cucu');
  }

  @Post('saveDto')
  @HttpCode(HttpStatus.CREATED)
  async saveDto(@Body() requestBody: TestDto) {

    const result = this.persistence.storeDocument(requestBody);

    return result;
  }

  @Get('getDto')
  async getDto() {

    const result = this.persistence.retrieveTests();

    return result;
  }
}
