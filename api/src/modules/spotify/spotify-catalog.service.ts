import { Injectable } from '@nestjs/common';
import { spotify } from './spotify-helpers';

@Injectable()
export class SpotifyCatalogService {
  static getSong(accessToken, songId) {
    return spotify(accessToken).getTracks([songId]);
  }
}