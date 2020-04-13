/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from '../../database/sequelize'; // 引入 Sequelize 实例

@Injectable()
export class ApplicationService {
  async applyOrganization(body: any): Promise<any> {
    const { from_id, to_id, org_id, apply_status } = body;
    const createOrgSQL = `
    INSERT INTO
    apply(from_id, to_id, org_id, apply_status)
    VALUES('${from_id}', '${to_id}', '${org_id}', '${apply_status}')`;
    try {
      await sequelize.query(createOrgSQL, { logging: false });
      return {
        code: 200,
        msg: 'success',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  async replyApplication(body: any): Promise<any> {
    const { id, apply_status } = body;
    const sql = `
    Update
      apply
    Set
      apply_status = '${apply_status}'
    WHERE
      id = ${id}
  `; // 一段平淡无奇的 SQL 查询语句
    try {
      const result = (
        await sequelize.query(sql, {
          type: Sequelize.QueryTypes.UPDATE, // 查询方式
          raw: true, // 是否使用数组组装的方式展示结果
          logging: true, // 是否将 SQL 语句打印到控制台
        })
      )[1];
      // 若查不到用户，则 user === undefined
      if (result) {
        return {
          code: 200,
          msg: 'Success update',
        };
      }
      return {
        code: 500,
        msg: '更新失败/或者可能是之前就是相同的不用无影响',
      };
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }

}
