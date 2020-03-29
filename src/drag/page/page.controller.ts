import { PageService } from './page.service';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Req, Body, Put, Post } from '@nestjs/common';
import { User } from 'src/decorator/user.decorator';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}


    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getPageCode(@User('userId') userId: number) {
      return this.pageService.findCodeByUserId(userId);
    }


    @UseGuards(AuthGuard('jwt'))
    @Post()
    async updatePageCode(@User('userId') userId: number, @Body("code") code: string) {
      return this.pageService.updateCodeByUserId(userId, code);
    }
}
