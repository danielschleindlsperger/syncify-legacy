import { Test, TestingModule } from '@nestjs/testing';
import { type } from 'ramda';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

describe('RoomController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [RoomService],
    }).compile();
  });

  describe('index', () => {
    it('should return a list of rooms"', async () => {
      const roomController = app.get<RoomController>(RoomController);
      const indexResponse = await roomController.index();
      expect(type(indexResponse)).toBe('Array');
      expect(indexResponse).toHaveLength(2);
    });
  });
});
