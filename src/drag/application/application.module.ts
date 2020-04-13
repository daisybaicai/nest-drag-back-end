import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';

import { Module } from '@nestjs/common';

@Module({
    controllers: [ApplicationController],
    providers: [ApplicationService],
    exports: [ApplicationService],
})
export class ApplicationModule {}
