import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import * as hbsrawutils from 'hbs-utils';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  const logger = new Logger('MAIN');

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.set('env', 'development');
  // await hbs.registerPartials(join(__dirname, '..', 'views', 'templates'), function (err) {console.error(err)});
  const hbsutils = hbsrawutils(hbs);
  await hbsutils.registerWatchedPartials(join(__dirname, '..', 'views', 'templates'), {
    // name: (template) => {
    //   console.log(`Registered template ${template}`);

    //   return `${template}`;
    // },
    onchange: (template) => logger.log(`Changed template ${template}`),
    precompile: true,
  });

  await app.listen(3000);
}
bootstrap();
