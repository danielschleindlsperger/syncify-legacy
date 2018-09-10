import { Get, Controller } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.model';

@Controller('/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async index(): Promise<Room[]> {
    return this.roomService.getAll();
  }
}
