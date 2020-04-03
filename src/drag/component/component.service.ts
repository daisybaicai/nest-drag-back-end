import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from '../../database/sequelize'; // 引入 Sequelize 实例

@Injectable()
export class ComponentService {
  async createComponent(userId: number, requestBody: any): Promise<any> {
    // 创建组织
    const { comName, comCode, comStatus, comOrgArr } = requestBody;
    const createOrgSQL = `INSERT INTO component(com_name, com_code, com_status, user_id) VALUES('${comName}', '${JSON.stringify(
      comCode,
    )}', '${comStatus}', ${userId})`;
    try {
      const result = (
        await sequelize.query(createOrgSQL, {
          type: Sequelize.QueryTypes.INSERT, // 查询方式
          raw: true, // 是否使用数组组装的方式展示结果
          logging: true, // 是否将 SQL 语句打印到控制台
        })
      )[0];
      if (comStatus === 'ORGINZATION' && comOrgArr) {
        // 对于组织类型还需加compoent&orginzation表
        const arrResult = await this.createComponentOrginzation(
          result,
          comOrgArr,
        );
        return arrResult;
      } else {
        return {
          code: 200,
          msg: '创建组件成功',
        };
      }
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  async createComponentOrginzation(
    componentId: number,
    comOrgArr: Array<number>,
  ): Promise<any> {
    // 分割orgId， 拼接sql
    let basicSql = `INSERT INTO component_orginzation(com_id, org_id) VALUES`;
    comOrgArr.forEach((item, index) => {
      if (index == comOrgArr.length - 1) {
        basicSql += `(${componentId}, ${item});`;
      } else {
        basicSql += `(${componentId}, ${item}),`;
      }
    });
    try {
      await sequelize.query(basicSql, {
        type: Sequelize.QueryTypes.INSERT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: true, // 是否将 SQL 语句打印到控制台
      });
      return {
        code: 200,
        msg: '创建组件成功',
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  async getUserComponents(userId: number): Promise<any> {
    // 分割orgId， 拼接sql
    const basicSql = `
    SELECT id, com_name, com_code, com_status FROM component WHERE com_status = 'PUBLIC'
    UNION
    SELECT id, com_name, com_code, com_status FROM component WHERE com_status = 'PERSONAL' and user_id = ${userId}
    UNION
    SELECT
      c.id, c.com_name, c.com_code, c.com_status
    FROM
      component c
          INNER JOIN
      component_orginzation co ON c.id = co.com_id
          INNER JOIN
      orginzation o ON o.id = co.org_id
          INNER JOIN
      user_orginzation uo ON uo.org_id = o.id
          INNER JOIN
      user u ON u.user_id = uo.user_id where u.user_id = ${userId};`;
    try {
      const res = await sequelize.query(basicSql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: true, // 是否将 SQL 语句打印到控制台
      });
      return {
        code: 200,
        msg: '查询成功',
        data: res,
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  async getPublicComponents(): Promise<any> {
    const sql = `
      SELECT id, com_name, com_status FROM component 
      WHERE com_status = 'PUBLIC'
    `;
    try {
      const res = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: true, // 是否将 SQL 语句打印到控制台
      });
      return {
        code: 200,
        msg: '查询成功',
        data: res,
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  async getPersonalComponents(userId: number): Promise<any> {
    const sql = `
      SELECT id, com_name, com_status FROM component 
      WHERE com_status = 'PERSONAL' and user_id = ${userId}
    `;
    try {
      const res = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: true, // 是否将 SQL 语句打印到控制台
      });
      return {
        code: 200,
        msg: '查询成功',
        data: res,
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }

  async getOrginzationComponents(userId: number): Promise<any> {
    const sql = `
    SELECT
      c.id, c.com_name, c.com_status
    FROM
      component c
          INNER JOIN
      component_orginzation co ON c.id = co.com_id
          INNER JOIN
      orginzation o ON o.id = co.org_id
          INNER JOIN
      user_orginzation uo ON uo.org_id = o.id
          INNER JOIN
      user u ON u.user_id = uo.user_id where u.user_id = ${userId}
    `;
    try {
      const res = await sequelize.query(sql, {
        type: Sequelize.QueryTypes.SELECT, // 查询方式
        raw: true, // 是否使用数组组装的方式展示结果
        logging: true, // 是否将 SQL 语句打印到控制台
      });
      return {
        code: 200,
        msg: '查询成功',
        data: res,
      };
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
