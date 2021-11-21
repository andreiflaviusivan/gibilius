import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Param, Delete } from '@nestjs/common';
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

  @Post('generateMajorDocuments/:nr')
  @HttpCode(HttpStatus.CREATED)
  async generateMajorDocuments(@Param('nr') nr: number, ) {
    for (let i = 0; i < nr; i++) {
      await this.persistence.storeDocument({
        birth: new Date(),
        cucu: `${i}`,
        id: null,
        major: true,
      });
    }
  }

  @Delete('deleteMajorDocuments')
  async deleteMajorDocuments() {
    const documents = await this.persistence.getMajorDocuments();

    await this.persistence.deleteDocuments(documents);
  }

  @Delete('deleteMajorDocumentsEfficient')
  async deleteMajorDocumentsEfficient() {
    await this.persistence.deleteMajorDocuments();
  }
}
