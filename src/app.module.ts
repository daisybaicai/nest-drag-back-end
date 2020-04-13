import { UserController } from './logical/user/user.controller';
// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
// import { AuthService } from './logical/auth/auth.service';
import { AuthModule } from './logical/auth/auth.module';
import { PageService } from './drag/page/page.service';
import { PageModule } from './drag/page/page.module';
import { OrginzationController } from './drag/orginzation/orginzation.controller';
import { OrginzationModule } from './drag/orginzation/orginzation.module';
import { ComponentModule } from './drag/component/component.module';
import { MulterModule } from '@nestjs/platform-express';

import { ApplicationService } from './drag/application/application.service';
import { ApplicationController } from './drag/application/application.controller';
import { ApplicationModule } from './drag/application/application.module';

@Module({
  imports: [UserModule, AuthModule, PageModule, OrginzationModule, ComponentModule,MulterModule.register({
    dest: './uploads',
  }), ApplicationModule],
  controllers: [AppController, UserController, OrginzationController, ApplicationController],
  providers: [AppService, PageService, ApplicationService],
})
export class AppModule {}
