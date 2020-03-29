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

@Module({
  imports: [UserModule, AuthModule, PageModule],
  controllers: [AppController, UserController],
  providers: [AppService, PageService],
})
export class AppModule {}
