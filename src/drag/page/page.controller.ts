import { PageService } from './page.service';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Body, Put, Post, Res } from '@nestjs/common';
import { User } from 'src/decorator/user.decorator';
import { Response } from 'express';
import fs = require('fs');
const path = require('path');
const zipper = require('zip-local');


@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}


    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getPageCode(@User('userId') userId: number) {
      return this.pageService.findCodeByUserId(userId);
    }


    @UseGuards(AuthGuard('jwt'))
    @Put()
    async updatePageCode(@User('userId') userId: number, @Body("code") code: string) {
      const hasCode = await this.pageService.findCodeByUserId(userId);
      if(hasCode.code === 200) {
        return this.pageService.updateCodeByUserId(userId, code);
      } else {
        return this.pageService.postCodeByUserId(userId, code);
      }
    }

    @Post('/zip')
    async getZip(@Body("code") code: string, @Res() res: Response) {
      const data = await this.pageService.getZip(code);
      // console.log('data', data);
      const fileName = data.path;
      const filePath = path.join(__dirname, "../../../../zip", fileName);
      const stats = fs.statSync(filePath); 
      console.log('fipath', filePath);
      if(stats.isFile()){
        res.set({
          'Content-Type': 'application/zip',
          'Content-Disposition': 'attachment; filename='+fileName,
          'Content-Length': stats.size
        });
        return fs.createReadStream(filePath).pipe(res);
      } else {
        res.end(404);
      }
    }

    @Post('/zip')
    async getZip(@Body("code") code: string, @Res() res: Response) {
      const data = await this.pageService.getZip(code);
      // console.log('data', data);
      const fileName = data.path;
      const filePath = path.join(__dirname, "../../../../zip", fileName);
      const stats = fs.statSync(filePath); 
      console.log('fipath', filePath);
      if(stats.isFile()){
        res.set({
          'Content-Type': 'application/zip',
          'Content-Disposition': 'attachment; filename='+fileName,
          'Content-Length': stats.size
        });
        return fs.createReadStream(filePath).pipe(res);
      } else {
        res.end(404);
      }
    }
}
