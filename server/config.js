import globalOrigin from './globalOrigin';
'use strict';
const config = {};
config.faceAccessKey = {
  keyId: 'LTA...ZX',
  keyValue: 'YvJN4...xbtq'
};
config.IMRongCloudAccessKey = {
  keyId: 'pkfcg...obm8',
  keyValue: '6In...T34'
};
config.faceContrastHost = 'https://aliyuncs.com';
config.agrsSecret = 'bbg';
config.mongodb = {
  url: '127.0.0.1:27017/issuetracker',
  port: 80,
};
config.mysqldb = {
  host: '127.0.0.1',
  user: 'root',
  password: 'babuge.com',
  database: 'bbg_user_main'
}
//开发地址
config.originList = globalOrigin.list;
export default config;
