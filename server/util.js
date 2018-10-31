import CryptoJS  from 'crypto-js';
import tripledes from 'crypto-js/tripledes';
import Config from './config.js';

const util = {};
const typeofObj = function(filter,args){
    return "object"===typeof(filter)&&"object"===typeof(args);
}
util.filter = (filter,args) => { // 过滤
    var filter = filter;
    if(typeofObj(filter,args)){
      for(var key in args){
        if(typeofObj(filter[key],args[key])){
            filter[key] = args[key];
        }else{
        filter[key] = args[key]; // 加密
        }
      }
    }else{
      return false;
    }
    return filter;
};
util.encryption = (filter,args) => { // 加密
    var filter = filter;
    if(typeofObj(filter,args)){
      for(var key in args){
        if( filter.hasOwnProperty(key) ) {
            if(typeofObj(filter[key],args[key])){
                filter[key] = util.encryption(filter[key],args[key]);
            }else{
            filter[key] = tripledes.encrypt(args[key], Config.agrsSecret).toString(); // 加密
            }
        }
      }
    }else{
      return false;
    }
    return filter;
};
util.decrypt = (filter,args) => { // 解密
    var filter = filter;
    if(typeofObj(filter,args)){
      for(var key in args){
        if( filter.hasOwnProperty(key) ) {
            if(typeofObj(filter[key],args[key])){
                filter[key] = util.decrypt(filter[key],args[key]);
            }else{
                filter[key] = tripledes.decrypt(args[key], Config.agrsSecret).toString(CryptoJS.enc.Utf8); // 解密
            }
        }
      }
    }else{
      return false;
    }
    return filter;
};
util.origin = (req,res) => {
    var hasOrigin = false;
    Config.originList.forEach(value => {
        if(req.headers.origin === value){
            hasOrigin = true;
        };
        console.log(value)
    });
    console.log('req:'+req.headers.origin)
    if(hasOrigin === true){
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","POST,GET,OPTIONS,DELETE");
        res.header("X-Powered-By",' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
    }
    return res;
};

util.ipAddress = (req) => {
    let ip = req.headers['x-forwarded-for'] ||
        req.ip ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress || '';
    if(ip.split(',').length>0){
        ip = ip.split(',')[0]
    }
    return ip;
};

export default util;