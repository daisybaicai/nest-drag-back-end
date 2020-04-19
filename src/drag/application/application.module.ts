import { OrginzationService } from './../orginzation/orginzation.service';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';

import { Module } from '@nestjs/common';

@Module({
    controllers: [ApplicationController],
    providers: [ApplicationService, OrginzationService],
    exports: [ApplicationService],
})
export class ApplicationModule {}
