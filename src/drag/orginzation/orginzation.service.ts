/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from '../../database/sequelize'; // 引入 Sequelize 实例

@Injectable()
export class OrginzationService {
  async findOrginzationByUserId(userId: number): Promise<any> {
    const sql = `SELECT count(*) as number FROM orginzation where user_id = '${userId}' `;
    try {
      const result = (
        await sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT, // 查询方式
          raw: true, // 是否使用数组组装的方式展示结果
          logging: true, // 是否将 SQL 语句打印到控制台
        })
      )[0];
      return result;
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }

  async createOriginzation(userId: number, requestBody: any): Promise<any> {
    const result = await this.findOrginzationByUserId(userId);
    if (result.number >= 5) {
      return {
        code: 200,
        msg: '每一个用户能创建的组织不能超过5个',
      };
    }
    // 创建组织
    const { orgName, orgDescription } = requestBody;
    const createOrgSQL = `INSERT INTO orginzation(org_name, org_description, user_id) VALUES('${orgName}', '${orgDescription}', ${userId})`;
    try {
      await sequelize.query(createOrgSQL, { logging: false });
      return {
        code: 200,
        msg: '创建组织成功',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  async getOrginzationsByUserId(userId: number): Promise<any> {
    const sql = `SELECT group_concat(org_id) as org_arr from user_orginzation WHERE user_id = '${userId}' GROUP BY user_id;`;
    try {
      const result = (
        await sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT, // 查询方式
          raw: true, // 是否使用数组组装的方式展示结果
          logging: true, // 是否将 SQL 语句打印到控制台
        })
      )[0];
      const splitArr = result['org_arr'].split(',');
      const resultArr = splitArr.map(Number);
      return {
        code: 200,
        data: {
          orgArr: resultArr,
        },
      };
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }

  async getOrganizationList(userId: number): Promise<any> {
    const sql = `
    SELECT*,(
      SELECT CASE WHEN COUNT(1)> 0 THEN 'true' ELSE 'false' END FROM user_orginzation uo WHERE uo.org_id=o.id AND uo.user_id=${userId}) AS user_status FROM orginzation o LEFT JOIN (
      SELECT a.apply_status,a.org_id,a.from_id FROM apply a) tmp ON o.id=tmp.org_id AND tmp.from_id=${userId}
    `;
    try {
      const result = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: true, // 是否将 SQL 语句打印到控制台
      });
      return {
        code: 200,
        data: {
          list: result,
        },
      };
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }

  async getOrganizationMyList(userId: number): Promise<any> {
    const sql = `
    SELECT*,(
      SELECT CASE WHEN COUNT(1)> 0 THEN 'true' ELSE 'false' END FROM user_orginzation uo WHERE uo.org_id=o.id AND uo.user_id=${userId}) AS user_status FROM orginzation o LEFT JOIN (
      SELECT a.apply_status,a.org_id,a.from_id FROM apply a) tmp ON o.id=tmp.org_id AND tmp.from_id=${userId}
    `;
    try {
      const result = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: true, // 是否将 SQL 语句打印到控制台
      });
      const list = result.filter(item => item.user_status === 'true');
      return {
        code: 200,
        data: {
          list: list,
        },
      };
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }
}
