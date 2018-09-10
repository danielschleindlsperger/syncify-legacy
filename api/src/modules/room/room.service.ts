import { Injectable } from '@nestjs/common';
import { Room } from './room.model';

const rooms = [
  {
    id: '1',
    name: 'Groovy Funky Town',
  },
  {
    id: '2',
    name: 'Gangsta Gangsta Gangsta',
  },
];

@Injectable()
export class RoomService {
  getAll = (): Room[] => rooms;
}
