/*
 Navicat Premium Data Transfer

 Source Server         : dashboard
 Source Server Type    : MySQL
 Source Server Version : 50728
 Source Host           : localhost:3306
 Source Schema         : test4

 Target Server Type    : MySQL
 Target Server Version : 50728
 File Encoding         : 65001

 Date: 02/06/2020 10:35:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for apply
-- ----------------------------
DROP TABLE IF EXISTS `apply`;
CREATE TABLE `apply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_id` int(11) DEFAULT NULL,
  `to_id` int(11) DEFAULT NULL,
  `org_id` int(11) DEFAULT NULL,
  `apply_status` varchar(40) COLLATE utf8_bin DEFAULT 'PENDING',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `org_id` (`org_id`,`from_id`,`to_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of apply
-- ----------------------------
BEGIN;
INSERT INTO `apply` VALUES (21, 19, 18, 64, 'PENDING', '2020-05-30 12:16:06', '2020-05-30 12:16:06');
COMMIT;

-- ----------------------------
-- Table structure for component
-- ----------------------------
DROP TABLE IF EXISTS `component`;
CREATE TABLE `component` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `com_name` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `com_code` text COLLATE utf8_bin,
  `com_status` varchar(40) COLLATE utf8_bin DEFAULT 'PUBLIC',
  `user_id` int(11) DEFAULT NULL COMMENT '创建者',
  `com_description` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '组件描述',
  `file_path` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '组件保存路径',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of component
-- ----------------------------
BEGIN;
INSERT INTO `component` VALUES (72, '表单', '{\"type\":\"div\",\"src\":\"div.png\",\"title\":\"div容器\",\"nested\":true,\"props\":{\"style\":{\"height\":\"400px\",\"width\":\"\",\"marginTop\":\"\"}},\"needDiv\":false,\"children\":[{\"type\":\"NavBar\",\"title\":\"导航栏\",\"src\":\"navbar.png\",\"nested\":false,\"props\":{\"content\":\"表单\",\"style\":{},\"mode\":\"dark\"},\"needDiv\":false,\"config\":[{\"text\":\"文字内容\",\"children\":[{\"type\":\"string\",\"text\":\"内容\",\"field\":\"content\"},{\"type\":\"array\",\"text\":\"主题颜色\",\"field\":\"mode\",\"data\":[{\"text\":\"深色\",\"value\":\"dark\"},{\"text\":\"亮色\",\"value\":\"light\"}]},{\"type\":\"string\",\"text\":\"左侧内容\",\"field\":\"leftContent\"},{\"type\":\"string\",\"text\":\"右侧内容\",\"field\":\"rightContent\"}]}]},{\"type\":\"InputItem\",\"title\":\"输入文本框\",\"src\":\"inputitem.png\",\"needDiv\":true,\"nested\":false,\"props\":{\"content\":\"姓名\",\"placeholder\":\"输入姓名\"},\"config\":[{\"text\":\"文字内容\",\"children\":[{\"type\":\"string\",\"text\":\"内容\",\"field\":\"content\"},{\"type\":\"string\",\"text\":\"用户提示\",\"field\":\"placeholder\"},{\"type\":\"array\",\"text\":\"输入类型\",\"field\":\"type\",\"data\":[{\"text\":\"银行卡类型\",\"value\":\"bankCard\"},{\"text\":\"普通输入\",\"value\":\"string\"},{\"text\":\"电话输入\",\"value\":\"phone\"},{\"text\":\"密码输入\",\"value\":\"password\"},{\"text\":\"number数值输入\",\"value\":\"number\"}]},{\"type\":\"boolean\",\"text\":\"是否禁用\",\"field\":\"disabled\"},{\"type\":\"boolean\",\"text\":\"是否可清除\",\"field\":\"clear\"}]}]},{\"type\":\"InputItem\",\"title\":\"输入文本框\",\"src\":\"inputitem.png\",\"needDiv\":true,\"nested\":false,\"props\":{\"content\":\"年龄\",\"placeholder\":\"输入年龄\",\"type\":\"number\"},\"config\":[{\"text\":\"文字内容\",\"children\":[{\"type\":\"string\",\"text\":\"内容\",\"field\":\"content\"},{\"type\":\"string\",\"text\":\"用户提示\",\"field\":\"placeholder\"},{\"type\":\"array\",\"text\":\"输入类型\",\"field\":\"type\",\"data\":[{\"text\":\"银行卡类型\",\"value\":\"bankCard\"},{\"text\":\"普通输入\",\"value\":\"string\"},{\"text\":\"电话输入\",\"value\":\"phone\"},{\"text\":\"密码输入\",\"value\":\"password\"},{\"text\":\"number数值输入\",\"value\":\"number\"}]},{\"type\":\"boolean\",\"text\":\"是否禁用\",\"field\":\"disabled\"},{\"type\":\"boolean\",\"text\":\"是否可清除\",\"field\":\"clear\"}]}]},{\"type\":\"Button\",\"src\":\"button.png\",\"title\":\"按钮\",\"props\":{\"type\":\"primary\",\"content\":\"提交\",\"style\":{\"height\":\"\",\"width\":\"\",\"marginTop\":\"\"}},\"config\":[{\"text\":\"主题\",\"children\":[{\"type\":\"array\",\"text\":\"主题\",\"field\":\"type\",\"data\":[{\"text\":\"普通primary\",\"value\":\"primary\"},{\"text\":\"透明\",\"value\":\"ghost\"},{\"text\":\"警告色红色\",\"value\":\"warning\"}]},{\"type\":\"array\",\"text\":\"大小\",\"field\":\"size\",\"data\":[{\"text\":\"大尺寸\",\"value\":\"large\"},{\"text\":\"小尺寸\",\"value\":\"small\"}]},{\"type\":\"boolean\",\"text\":\"是否禁用\",\"field\":\"disabled\"},{\"type\":\"boolean\",\"text\":\"行内元素\",\"field\":\"inline\"},{\"type\":\"array\",\"text\":\"icon\",\"field\":\"icon\",\"data\":[{\"text\":\"check-circle\",\"value\":\"check-circle\"},{\"text\":\"check\",\"value\":\"check\"},{\"text\":\"check-circle-o\",\"value\":\"check-circle-o\"},{\"text\":\"cross-circle\",\"value\":\"cross-circle\"},{\"text\":\"cross\",\"value\":\"cross\"},{\"text\":\"cross-circle-o\",\"value\":\"cross-circle-o\"},{\"text\":\"up\",\"value\":\"up\"},{\"text\":\"down\",\"value\":\"down\"},{\"text\":\"left\",\"value\":\"left\"},{\"text\":\"right\",\"value\":\"right\"},{\"text\":\"ellipsis\",\"value\":\"ellipsis\"},{\"text\":\"loading\",\"value\":\"loading\"},{\"text\":\"无\",\"value\":false}]}]},{\"text\":\"文字内容\",\"children\":[{\"type\":\"string\",\"text\":\"内容\",\"field\":\"content\"}]},{\"text\":\"样式\",\"key\":\"style\",\"children\":[{\"type\":\"string\",\"text\":\"宽度\",\"field\":\"style.width\"},{\"type\":\"string\",\"text\":\"高度\",\"field\":\"style.height\"},{\"type\":\"string\",\"text\":\"上边距\",\"field\":\"style.marginTop\"}]}]}],\"config\":[{\"text\":\"样式\",\"key\":\"style\",\"children\":[{\"type\":\"string\",\"text\":\"宽度\",\"field\":\"style.width\"},{\"type\":\"string\",\"text\":\"高度\",\"field\":\"style.height\"},{\"type\":\"string\",\"text\":\"上边距\",\"field\":\"style.marginTop\"}]}]}', 'PUBLIC', 18, '一个提交的表单', 'http://qacp2knlf.bkt.clouddn.com/image-82b6.png');
COMMIT;

-- ----------------------------
-- Table structure for component_orginzation
-- ----------------------------
DROP TABLE IF EXISTS `component_orginzation`;
CREATE TABLE `component_orginzation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `com_id` int(11) DEFAULT NULL COMMENT '组件id',
  `org_id` int(11) DEFAULT NULL COMMENT '组织id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Table structure for orginzation
-- ----------------------------
DROP TABLE IF EXISTS `orginzation`;
CREATE TABLE `orginzation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `org_name` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `org_description` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL COMMENT '创建组织者',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of orginzation
-- ----------------------------
BEGIN;
INSERT INTO `orginzation` VALUES (64, '呼呼', 'a1234', 18);
INSERT INTO `orginzation` VALUES (65, '小小的组织', '小小的组织在这里', 19);
COMMIT;

-- ----------------------------
-- Table structure for page
-- ----------------------------
DROP TABLE IF EXISTS `page`;
CREATE TABLE `page` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `code` text COLLATE utf8_bin,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of page
-- ----------------------------
BEGIN;
INSERT INTO `page` VALUES (7, 18, '[{\"type\":\"div\",\"src\":\"div.png\",\"title\":\"div容器\",\"nested\":true,\"props\":{\"style\":{\"height\":\"400px\",\"width\":\"\",\"marginTop\":\"\"}},\"needDiv\":false,\"children\":[{\"type\":\"NavBar\",\"title\":\"导航栏\",\"src\":\"navbar.png\",\"nested\":false,\"props\":{\"content\":\"表单\",\"style\":{},\"mode\":\"dark\"},\"needDiv\":false,\"config\":[{\"text\":\"文字内容\",\"children\":[{\"type\":\"string\",\"text\":\"内容\",\"field\":\"content\"},{\"type\":\"array\",\"text\":\"主题颜色\",\"field\":\"mode\",\"data\":[{\"text\":\"深色\",\"value\":\"dark\"},{\"text\":\"亮色\",\"value\":\"light\"}]},{\"type\":\"string\",\"text\":\"左侧内容\",\"field\":\"leftContent\"},{\"type\":\"string\",\"text\":\"右侧内容\",\"field\":\"rightContent\"}]}]},{\"type\":\"InputItem\",\"title\":\"输入文本框\",\"src\":\"inputitem.png\",\"needDiv\":true,\"nested\":false,\"props\":{\"content\":\"姓名\",\"placeholder\":\"输入姓名\"},\"config\":[{\"text\":\"文字内容\",\"children\":[{\"type\":\"string\",\"text\":\"内容\",\"field\":\"content\"},{\"type\":\"string\",\"text\":\"用户提示\",\"field\":\"placeholder\"},{\"type\":\"array\",\"text\":\"输入类型\",\"field\":\"type\",\"data\":[{\"text\":\"银行卡类型\",\"value\":\"bankCard\"},{\"text\":\"普通输入\",\"value\":\"string\"},{\"text\":\"电话输入\",\"value\":\"phone\"},{\"text\":\"密码输入\",\"value\":\"password\"},{\"text\":\"number数值输入\",\"value\":\"number\"}]},{\"type\":\"boolean\",\"text\":\"是否禁用\",\"field\":\"disabled\"},{\"type\":\"boolean\",\"text\":\"是否可清除\",\"field\":\"clear\"}]}]},{\"type\":\"InputItem\",\"title\":\"输入文本框\",\"src\":\"inputitem.png\",\"needDiv\":true,\"nested\":false,\"props\":{\"content\":\"年龄\",\"placeholder\":\"输入年龄\",\"type\":\"number\"},\"config\":[{\"text\":\"文字内容\",\"children\":[{\"type\":\"string\",\"text\":\"内容\",\"field\":\"content\"},{\"type\":\"string\",\"text\":\"用户提示\",\"field\":\"placeholder\"},{\"type\":\"array\",\"text\":\"输入类型\",\"field\":\"type\",\"data\":[{\"text\":\"银行卡类型\",\"value\":\"bankCard\"},{\"text\":\"普通输入\",\"value\":\"string\"},{\"text\":\"电话输入\",\"value\":\"phone\"},{\"text\":\"密码输入\",\"value\":\"password\"},{\"text\":\"number数值输入\",\"value\":\"number\"}]},{\"type\":\"boolean\",\"text\":\"是否禁用\",\"field\":\"disabled\"},{\"type\":\"boolean\",\"text\":\"是否可清除\",\"field\":\"clear\"}]}]},{\"type\":\"Button\",\"src\":\"button.png\",\"title\":\"按钮\",\"props\":{\"type\":\"warning\",\"content\":\"按钮一只\",\"style\":{\"height\":\"\",\"width\":\"\",\"marginTop\":\"\"}},\"config\":[{\"text\":\"主题\",\"children\":[{\"type\":\"array\",\"text\":\"主题\",\"field\":\"type\",\"data\":[{\"text\":\"普通primary\",\"value\":\"primary\"},{\"text\":\"透明\",\"value\":\"ghost\"},{\"text\":\"警告色红色\",\"value\":\"warning\"}]},{\"type\":\"array\",\"text\":\"大小\",\"field\":\"size\",\"data\":[{\"text\":\"大尺寸\",\"value\":\"large\"},{\"text\":\"小尺寸\",\"value\":\"small\"}]},{\"type\":\"boolean\",\"text\":\"是否禁用\",\"field\":\"disabled\"},{\"type\":\"boolean\",\"text\":\"行内元素\",\"field\":\"inline\"},{\"type\":\"array\",\"text\":\"icon\",\"field\":\"icon\",\"data\":[{\"text\":\"check-circle\",\"value\":\"check-circle\"},{\"text\":\"check\",\"value\":\"check\"},{\"text\":\"check-circle-o\",\"value\":\"check-circle-o\"},{\"text\":\"cross-circle\",\"value\":\"cross-circle\"},{\"text\":\"cross\",\"value\":\"cross\"},{\"text\":\"cross-circle-o\",\"value\":\"cross-circle-o\"},{\"text\":\"up\",\"value\":\"up\"},{\"text\":\"down\",\"value\":\"down\"},{\"text\":\"left\",\"value\":\"left\"},{\"text\":\"right\",\"value\":\"right\"},{\"text\":\"ellipsis\",\"value\":\"ellipsis\"},{\"text\":\"loading\",\"value\":\"loading\"},{\"text\":\"无\",\"value\":false}]}]},{\"text\":\"文字内容\",\"children\":[{\"type\":\"string\",\"text\":\"内容\",\"field\":\"content\"}]},{\"text\":\"样式\",\"key\":\"style\",\"children\":[{\"type\":\"string\",\"text\":\"宽度\",\"field\":\"style.width\"},{\"type\":\"string\",\"text\":\"高度\",\"field\":\"style.height\"},{\"type\":\"string\",\"text\":\"上边距\",\"field\":\"style.marginTop\"}]}]},{\"type\":\"ImagePicker\",\"title\":\"图片选择器\",\"nested\":false,\"src\":\"imagepicker.png\",\"props\":{\"style\":{},\"length\":6},\"needDiv\":true,\"config\":[{\"text\":\"文字内容\",\"children\":[{\"type\":\"string\",\"text\":\"单排展示图片长度\",\"field\":\"length\"}]}]},{\"type\":\"Button\",\"src\":\"button.png\",\"title\":\"按钮\",\"props\":{\"type\":\"primary\",\"content\":\"提交\",\"style\":{\"height\":\"\",\"width\":\"\",\"marginTop\":\"\"}},\"config\":[{\"text\":\"主题\",\"children\":[{\"type\":\"array\",\"text\":\"主题\",\"field\":\"type\",\"data\":[{\"text\":\"普通primary\",\"value\":\"primary\"},{\"text\":\"透明\",\"value\":\"ghost\"},{\"text\":\"警告色红色\",\"value\":\"warning\"}]},{\"type\":\"array\",\"text\":\"大小\",\"field\":\"size\",\"data\":[{\"text\":\"大尺寸\",\"value\":\"large\"},{\"text\":\"小尺寸\",\"value\":\"small\"}]},{\"type\":\"boolean\",\"text\":\"是否禁用\",\"field\":\"disabled\"},{\"type\":\"boolean\",\"text\":\"行内元素\",\"field\":\"inline\"},{\"type\":\"array\",\"text\":\"icon\",\"field\":\"icon\",\"data\":[{\"text\":\"check-circle\",\"value\":\"check-circle\"},{\"text\":\"check\",\"value\":\"check\"},{\"text\":\"check-circle-o\",\"value\":\"check-circle-o\"},{\"text\":\"cross-circle\",\"value\":\"cross-circle\"},{\"text\":\"cross\",\"value\":\"cross\"},{\"text\":\"cross-circle-o\",\"value\":\"cross-circle-o\"},{\"text\":\"up\",\"value\":\"up\"},{\"text\":\"down\",\"value\":\"down\"},{\"text\":\"left\",\"value\":\"left\"},{\"text\":\"right\",\"value\":\"right\"},{\"text\":\"ellipsis\",\"value\":\"ellipsis\"},{\"text\":\"loading\",\"value\":\"loading\"},{\"text\":\"无\",\"value\":false}]}]},{\"text\":\"文字内容\",\"children\":[{\"type\":\"string\",\"text\":\"内容\",\"field\":\"content\"}]},{\"text\":\"样式\",\"key\":\"style\",\"children\":[{\"type\":\"string\",\"text\":\"宽度\",\"field\":\"style.width\"},{\"type\":\"string\",\"text\":\"高度\",\"field\":\"style.height\"},{\"type\":\"string\",\"text\":\"上边距\",\"field\":\"style.marginTop\"}]}]}],\"config\":[{\"text\":\"样式\",\"key\":\"style\",\"children\":[{\"type\":\"string\",\"text\":\"宽度\",\"field\":\"style.width\"},{\"type\":\"string\",\"text\":\"高度\",\"field\":\"style.height\"},{\"type\":\"string\",\"text\":\"上边距\",\"field\":\"style.marginTop\"}]}]}]');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(6) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(24) NOT NULL COMMENT '用户账号',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `passwd_salt` varchar(6) NOT NULL COMMENT '密码盐',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='后台用户表';

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (18, '张张', 'pDoitMWbxQZjbOB6KMmV1A==', 'eNnY');
INSERT INTO `user` VALUES (19, '小小', 'O+m0lOAIBWS+CiPOvIfGeA==', '0hAU');
COMMIT;

-- ----------------------------
-- Table structure for user_orginzation
-- ----------------------------
DROP TABLE IF EXISTS `user_orginzation`;
CREATE TABLE `user_orginzation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `org_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of user_orginzation
-- ----------------------------
BEGIN;
INSERT INTO `user_orginzation` VALUES (18, 18, 64);
INSERT INTO `user_orginzation` VALUES (19, 19, 65);
COMMIT;

-- ----------------------------
-- Triggers structure for table orginzation
-- ----------------------------
DROP TRIGGER IF EXISTS `org_trigger`;
delimiter ;;
CREATE TRIGGER `org_trigger` AFTER INSERT ON `orginzation` FOR EACH ROW INSERT INTO user_orginzation(user_id, org_id) VALUES(new.user_id, new.id)
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
