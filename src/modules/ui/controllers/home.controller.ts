import { Controller, Get, Query, Render } from '@nestjs/common';

@Controller()
export class HomeController {
  constructor() {}

  @Get()
  @Render('index')
  index() {
    return { message: 'salutareee!' };
  }
}
