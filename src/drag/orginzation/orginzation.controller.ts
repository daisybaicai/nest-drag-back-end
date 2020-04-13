import { ValidationPipe } from './../../pipe/validation.pipe';
import { OrginzationInfoDTO } from './orginzation.dto';
import { OrginzationService } from './orginzation.service';
import { Controller, Post, Body, UseGuards, UsePipes, Get } from '@nestjs/common';
import { User } from 'src/decorator/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('orginzation')
export class OrginzationController {
    constructor(private readonly orginzationService: OrginzationService) {}

    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createOriginzation(@User('userId') userId: number, @Body() body: OrginzationInfoDTO) {
        return this.orginzationService.createOriginzation(userId, body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getOrginzationsByUserId(@User('userId') userId: number) {
        return this.orginzationService.getOrginzationsByUserId(userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/list')
    async getOrganizationList(@User('userId') userId: number) {
        return this.orginzationService.getOrganizationList(userId);
    }
}
