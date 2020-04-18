import { IsNotEmpty, IsEnum } from "class-validator";

export class ApplicationInfoDTO {
    // @IsNotEmpty({ message: '发送者id不能为空'})
    // readonly from_id: number;
    @IsNotEmpty({ message: '接收者id不能为空'})
    readonly to_id: number;
    @IsNotEmpty({ message: '申请类型不能为空'})
    @IsEnum({ 申请中: 'PENDING', 同意: 'ACCEPT', 拒绝: 'REJECT'}, { message: 'type类型错误'})
    readonly apply_status: string;
    @IsNotEmpty({ message: '组织id不能为空'})
    readonly org_id: number;
}