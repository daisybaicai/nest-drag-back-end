import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from '../../database/sequelize'; // 引入 Sequelize 实例
// 引入七牛模块
// import * as qiniu from 'qiniu';
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

@Injectable()
export class ComponentService {
  async createComponent(userId: number, requestBody: any): Promise<any> {
    // 创建组织
    const { comName, comCode, comStatus, comOrgArr, filePath, comDescription } = requestBody;
    const createOrgSQL = `INSERT INTO component(com_name, com_code, com_status, user_id, com_description, file_path) VALUES('${comName}', '${JSON.stringify(
      comCode,
    )}', '${comStatus}', ${userId}, '${comDescription}', '${filePath}')`;
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
    SELECT id, com_name, com_code, com_status, file_path FROM component WHERE com_status = 'PUBLIC'
    UNION
    SELECT id, com_name, com_code, com_status, file_path FROM component WHERE com_status = 'PERSONAL' and user_id = ${userId}
    UNION
    SELECT
      c.id, c.com_name, c.com_code, c.com_status, c.file_path
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
      SELECT id, com_name, com_status, com_description, file_path FROM component 
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
      SELECT id, com_name, com_status, com_description, file_path FROM component 
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
      c.id, c.com_name, c.com_status, c.com_description, c.file_path
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

  UploadmyFile(filename: string): any {
    try {
      const localFile = `/Users/daisiyao/Desktop/boi/nest-drag-back-end/uploads/${filename}`;
      const formUploader = new qiniu.form_up.FormUploader(config);
      const putExtra = new qiniu.form_up.PutExtra();
      const key = filename;
      // 文件上传
      formUploader.putFile(uploadToken, key, localFile, putExtra, function(
        respErr,
        respBody,
        respInfo,
      ) {
        if (respErr) {
          throw respErr;
        }
        if (respInfo.statusCode == 200) {
          console.log(respBody);
          return {
            code: 200,
            data: 'jhaa'
          };
        } else {
          console.log(respInfo.statusCode);
          console.log(respBody);
          return respBody;
        }
      })
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
