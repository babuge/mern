'use strict';
const config = {};
config.faceAccessKey = {
  keyId: 'LTA...ZX',
  keyValue: 'YvJN4...xbtq'
};
config.IMRongCloudAccessKey = {
  keyId: 'pkf...pobm8',
  keyValue: '6In...T34'
};
config.faceContrastHost = 'https://aliyuncs.com';
config.agrsSecret = 'bbg';
config.mongodb = {
  url: 'localhost:27017/issuetracker',
  port: 80
};
config.originList = [];
config.originList.push('http://localhost');
config.originList.push('http://www.babuge.com');
config.originList.push('http://localhost:8000');
export default config;