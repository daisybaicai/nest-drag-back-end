import { IsNotEmpty, MaxLength } from "class-validator";

export class OrginzationInfoDTO {
    @IsNotEmpty({ message: '组织名称不能为空'})
    @MaxLength(10, { message: '组织名称不能超过10个字符' })
    readonly orgName: string;
    @IsNotEmpty({ message: '组织描述不能为空'})
    @MaxLength(50, { message: '组织描述不能超过50个字符' })
    readonly orgDescription: string;
}