
# Nest-drag-back-end

可视化平台的后端

## Description

基于Nest.js的后端。数据库使用MySQL.

## Installation

```bash
$ npm install
```

## 后端设计
本系统的后端采用 Node.js 实现，选择 Nest 框架进行业务实现，MySQL 作为 数据持久化容器。与前端的系统实现一样，也采用分层的架构来进行系统实现。 系统架构图如图 3-9 所示，通过 database 层的相关数据库配置，filter 层的异常过 滤，同时具体业务功能均为 controller,services,models 配合实现。通过 JWT 来实现 用户的验证，将统一的公共方法放置于 utils 中。

## 数据库表结构设计
本系统数据库设计为 7个表，分别是用户表、页面表、组件表、组织表、申请表、组件和组织的关联表、用户和组织的关联表。

### （1）用户表

用户表包括用户ID、用户名、用户密码、密码盐四个字段。其表结构详见表 3-4 所示。

**表 3-4 用户表**

|字段名称|字段类型|	字段说明	|备注|
|-------| ------- | ------- | ------- |
|user_id|	int	|用户id	|自增主键|
|username|	varchar(24)	|用户名	|唯一|
|password	|varchar(32)	|用户密码|	必填|
|passwd_salt|	varchar(6)|	密码盐|	必填|

### （2）页面表

页面表包括页面ID、页面代码、页面创建者三个字段。其表结构详见表 3-5 所示。

**表 3-5 页面表**

|字段名称|字段类型|	字段说明	|备注|
|-------| ------- | ------- | ------- |
|id|	int	|页面id	|自增主键|
|user_id	|int	|页面创建者|	必填|
|code|	text|	页面代码	|必填|

### （3）组件表

组件表包括组件ID、组件名称、组件代码、组件状态、组件创建者、组件描述、组件缩略图路径七个字段。其表结构详见表 3-6 所示。

**表 3-6 组件表**

|字段名称|字段类型|	字段说明	|备注|
|-------| ------- | ------- | ------- |
|id	|int	|组件|id|	自增主键|
|com_name	|varchar(100)|	组件名称	|必填|
|com_code	|text	|组件代码	|必填|
|com_status	|varchar(40)	|组件状态	|三种状态（个人PERSONAL，组织ORGANIZATION，公开PUBLIC）|
|user_id|	int	|组件创建者|	必填|
|com_description|	varchar(255)	|组件描述|	必填|
|file_path|	varchar(255)	|组件缩略图路径	|必填|

### （4）组织表

组织表包括组织ID、组织名称、组织描述、组织创建者四个字段。其表结构详见表 3-7 所示。

**表 3-7 组织表**

|字段名称|字段类型|	字段说明	|备注|
|-------| ------- | ------- | ------- |
|id	|int|	组织id	|自增主键 |
|org_name	|varchar(40)	|组织名称|	必填|
|org_description	|varchar(255)	|组织描述|	必填|
|user_id|	int	|组织创建者|	必填|

### （5）申请表

申请表包括申请ID、申请者、组织id、组织管理者、申请状态、创建时间、更新时间七个字段。其表结构详见表 3-8 所示。

**表 3-8 申请表**

|字段名称|字段类型|	字段说明	|备注|
|-------| ------- | ------- | ------- |
|id	|int|	申请id	|自增主键|
|from_id|	int	|申请者|	必填|
|to_id	|int	|组织管理者	|必填|
|org_id|	int|	组织id	|必填|
|apply_status|	varchar(40)	|申请状态	三种状态(申请中PENDING，同意ACCEPT，拒绝REJECT|
|create_time	|datetime	|创建时间|	自动生成|
|update_time|	datetime	|更新时间|	自动生成|

### （6）组件和组织的关联表

组件和组织的关联表包括ID、组件id、组织id三个字段。其表结构详见表 3-9 所示。

**表 3-9  组件和组织的关联表**

|字段名称|字段类型|	字段说明	|备注|
|-------| ------- | ------- | ------- |
|id|	int	|id	|自增主键|
|com_id|	int	|组件id	|必填|
|org_id	|int	|组织id	|必填|

###（7）用户和组织的关联表

用户和组织的关联表包括ID、用户id、组织id三个字段。其表结构详见表 3-10 所示。

**表 3-10 用户和组织的关联表**

|字段名称|字段类型|	字段说明	|备注|
|-------| ------- | ------- | ------- |
|id|	int	|id	|自增主键|
|user_id|	int|	用户id|	必填|
|org_id|	int	|组织id	|必填|




## Running the app

首次使用需先下载对应的数据库配置文件（test4.sql），以及在config/db.ts配置相应的数据库。

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Stay in touch

- Author - [daisybaicai]

## License

  Nest is [MIT licensed](LICENSE).
