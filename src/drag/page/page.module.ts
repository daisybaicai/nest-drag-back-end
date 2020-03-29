import { PageService } from './page.service';
import { Module } from '@nestjs/common';
import { PageController } from './page.controller';

@Module({
  controllers: [PageController],
  providers: [PageService],
  exports: [PageService],
})
export class PageModule {}

