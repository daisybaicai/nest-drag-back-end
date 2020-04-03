import { ValidationPipe } from './../../pipe/validation.pipe';
import { ComponentInfoDto } from './component.dto';
import { ComponentService } from './component.service';
import { Controller, UseGuards, Post, Body, UsePipes, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decorator/user.decorator';

@Controller('component')
export class ComponentController {
    constructor(private readonly componentService: ComponentService) {}

    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createComponent(@User('userId') userId: number, @Body() body: ComponentInfoDto) {
        return this.componentService.createComponent(userId, body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUserComponents(@User('userId') userId: number) {
        return this.componentService.getUserComponents(userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/personal')
    async getPersonalComponents(@User('userId') userId: number) {
        return this.componentService.getPersonalComponents(userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/public')
    async getPublicComponents() {
        return this.componentService.getPublicComponents();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/orginzation')
    async getOrginzationComponents(@User('userId') userId: number) {
        return this.componentService.getOrginzationComponents(userId);
    }
}
