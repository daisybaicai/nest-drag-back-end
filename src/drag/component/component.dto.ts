import { IsNotEmpty, IsEnum, IsString, IsOptional } from 'class-validator';

export class ComponentInfoDto {
    @IsNotEmpty({message: '组件名称不能为空'})
    readonly comName: string;
    @IsNotEmpty({message: '组件code不能为空'})
    readonly comCode: any;
    @IsEnum({ 公开: 'PUBLIC', 个人: 'PERSONAL', 组织: 'ORGINZATION'}, { message: '必须为PUBLIC,PERSONAL,ORGINZATION之一'})
    @IsString({ message: '必须是字符类型'})
    readonly comStatus: string;
    
    @IsOptional()
    readonly comOrgArr: Array<number>;
}