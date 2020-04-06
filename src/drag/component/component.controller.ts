import { ValidationPipe } from './../../pipe/validation.pipe';
import { ComponentInfoDto } from './component.dto';
import { ComponentService } from './component.service';
import {
  Controller,
  UseGuards,
  Post,
  Body,
  UsePipes,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/decorator/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../../utils/file-upload.utils';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const qiniu = require('qiniu');

//要上传的空间名
const bucket = 'reactdrag0514';
const accessKey = 'd3U4GRz5_8eQL-lXBvUoZ3vNdL0q8VRKRw8wFCLe';
const secretKey = 'VgJZdylTiE2cGamGvRPFlVwfxk8CahNLBc0Xfv0f';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const options = {
  scope: bucket,
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);

const config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0;

@Controller('component')
export class ComponentController {
  constructor(private readonly componentService: ComponentService) {}

  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createComponent(
    @User('userId') userId: number,
    @Body() body: ComponentInfoDto,
  ) {
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

  @Post('/img')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file): Promise<any> {
    const filename = file.filename;
    // // 调用七牛云上传图片
    const localFile = `/Users/daisiyao/Desktop/boi/nest-drag-back-end/uploads/${filename}`;
    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();
    const key = filename;
    // 文件上传
    new Promise((reso, rej) => {
      formUploader.putFile(uploadToken, key, localFile, putExtra, function(
        respErr,
        respBody,
        respInfo,
      ) {
        if (respErr) {
          throw respErr;
        }
        if (respInfo.statusCode == 200) {
          console.log('data', respBody);
          reso(respBody);
        } else {
          console.log(respInfo.statusCode);
          console.log(respBody);
          rej(respBody);
        }
      });
    }).then((res) => {
        return res;
    });
    return {
        code: 200,
        data: {
            filename: `http://q8bn25vr4.bkt.clouddn.com/${filename}`
        }
    }
  }
}
