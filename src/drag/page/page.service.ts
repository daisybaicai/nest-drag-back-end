import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from '../../database/sequelize'; // 引入 Sequelize 实例
// eslint-disable-next-line @typescript-eslint/no-var-requires
const adm_zip = require('adm-zip');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

@Injectable()
export class PageService {
  /**
   * 查询该用户的page页面的code
   * @param userId 用户id
   */
  async findCodeByUserId(userId: number): Promise<any | undefined> {
    const sql = `
      SELECT
        code
      FROM
        page
      WHERE
        user_id = ${userId}
    `; // 一段平淡无奇的 SQL 查询语句
    try {
      const result = (
        await sequelize.query(sql, {
          type: Sequelize.QueryTypes.SELECT, // 查询方式
          raw: true, // 是否使用数组组装的方式展示结果
          logging: true, // 是否将 SQL 语句打印到控制台
        })
      )[0];
      // 若查不到用户，则 user === undefined
      if (result) {
        return {
          code: 200,
          data: {
            code: result.code,
          },
          msg: 'Success',
        };
      }
      // throw new Error("Whoops!");
      return {
        code: 500,
        msg: '暂无用户代码',
      };
    } catch (error) {
      console.error(error);
      return {
        code: 500,
        msg: error,
      }
      return void 0;
    }
  }

  async postCodeByUserId(userId: number, code: string): Promise<any> {
    const sql = `
    INSERT INTO page
      (user_id, code)
    VALUES
      ('${userId}', '${JSON.stringify(code)}')
  `;
    try {
      const result = (
        await sequelize.query(sql, {
          type: Sequelize.QueryTypes.INSERT, // 查询方式
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
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }
  async updateCodeByUserId(userId: number, code: string): Promise<any> {
    const sql = `
    Update
      page
    Set
      code = '${JSON.stringify(code)}'
    WHERE
      user_id = ${userId}
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

  async getZip(code: string): Promise<any> {
    // 写入代码文件
    fs.writeFile('./generateFiles/src/pages/index.jsx', code, function(err) {
      if (err) {
        return console.error(err);
      }
    });
    try {
      const { stdout, stderr } = await exec('cd /Users/daisiyao/Desktop/boi/nest-drag-back-end/generateFiles && npm run build');
      if(stdout) {
        const zip = new adm_zip();
        zip.addLocalFolder('./generateFiles/dist');
        zip.writeZip('zip/myapp.zip');
        return {
          path: 'myapp.zip',
        };
      }
    } catch (error) {
      console.error(error);
      return void 0;
    }
  }
}
