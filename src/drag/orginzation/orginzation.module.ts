import { OrginzationController } from './orginzation.controller';
import { Module } from '@nestjs/common';
import { OrginzationService } from './orginzation.service';

@Module({
  controllers: [OrginzationController],
  providers: [OrginzationService],
  exports: [OrginzationService],
})
export class OrginzationModule {}
