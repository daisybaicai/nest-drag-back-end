import { ValidationPipe } from './../../pipe/validation.pipe';
import { ApplicationInfoDTO } from './application.dto';
import { ApplicationService } from './application.service';
import { Controller, Post, Body, UsePipes, Put, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decorator/user.decorator';

@Controller('application')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) {}

    @UsePipes(new ValidationPipe)
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async applyOrganization(@Body() body: ApplicationInfoDTO, @User('userId') userId: number) {
        return this.applicationService.applyOrganization(body, userId);
    }

    @Put()
    async replyApplication(@Body() body) {
        return this.applicationService.replyApplication(body);
    }

    @Get('/all')
    @UseGuards(AuthGuard('jwt'))
    async getAllApplicationByUserId(@User('userId') userId: number) {
        return this.applicationService.getAllApplicationByUserId(userId);
    }
}
