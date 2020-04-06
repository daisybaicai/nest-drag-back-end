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

@Module({
  imports: [UserModule, AuthModule, PageModule, OrginzationModule, ComponentModule,MulterModule.register({
    dest: './uploads',
  })],
  controllers: [AppController, UserController, OrginzationController],
  providers: [AppService, PageService],
})
export class AppModule {}
