import { Test, TestingModule } from '@nestjs/testing';
import { TestController } from './test.controller';
import { AppService } from '../services';

describe('TestController', () => {
  let testController: TestController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
      providers: [AppService],
    }).compile();

    testController = app.get<TestController>(TestController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(testController.getHello('Gogu')).toBe('Hello World Gogu');
    });
  });
});
