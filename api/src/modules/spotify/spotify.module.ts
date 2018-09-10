import { Module } from '@nestjs/common';
import { SpotifyCatalogService } from './spotify-catalog.service';

@Module({
  exports: [SpotifyCatalogService],
})
export class SpotifyModule {}