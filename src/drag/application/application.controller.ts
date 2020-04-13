import { ValidationPipe } from './../../pipe/validation.pipe';
import { ApplicationInfoDTO } from './application.dto';
import { ApplicationService } from './application.service';
import { Controller, Post, Body, UsePipes, Put } from '@nestjs/common';

@Controller('application')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) {}

    @UsePipes(new ValidationPipe)
    @Post()
    async applyOrganization(@Body() body: ApplicationInfoDTO) {
        return this.applicationService.applyOrganization(body);
    }

    @Put()
    async replyApplication(@Body() body) {
        return this.applicationService.replyApplication(body);
    }
}
