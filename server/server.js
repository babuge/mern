import path from 'path';
import 'babel-polyfill';
// import SourceMapSupport from 'source-map-support';
import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import Issue from './issue.js';
import Config from './config.js';
import request from 'request';
import url  from 'url';
import Util from './util.js';
import rongCloud from 'rongcloud-sdk';
import crypto  from 'crypto';
import Client from './oss/client.js';
import Cookies from 'cookie-parser';
import compression from 'compression';
import sql from './sqlservice';
// SourceMapSupport.install(); // 源映射显示行号
const compressionFilter = (req, res) => {
  if (req.headers['x-no-compression']) {
    // 这里就过滤掉了请求头包含'x-no-compression'
    return false
   }
   return compression.filter(req, res)
};
const app = express();
app.use(express.static('static'));
app.use(bodyParser.json()); // bodyParser.json()创建中间件 并用 app.use()在应用层应用它
app.use(Cookies()); // cookie中间件
app.use(compression({filter: compressionFilter})); // gzip中间件:优化前端资源
let mongodb;
MongoClient.connect('mongodb://'+Config.mongodb.url).then(connection => {
  mongodb = connection;
  app.listen(Config.mongodb.port, () => {
    console.log('App started on port ' + Config.mongodb.port);
    sql.query(`select from users where id=3`,(res) => {
      console.log('ssql',err)
    },(err) => {
      console.log('esql',err)
    });
  });
}).catch(err => {
  console.log('ERROR:', err);
});
app.get('/api/articleList',(req, res)=>{
  const filter = {};
  if(req.query.id){
    filter.id = req.query.id;
  }
  mongodb.collection('article').find(filter).toArray()
  .then( article => {
    const metadata = { total_count: article.length};
    res.json({_metadata: metadata, records: article});
  })
  .catch(error => {
    res.status(500).json({message: `Internal Server Error: ${error}`});
  })
})
app.get('/api/issues', (req, res) => {
  const filter = {};
  if (req.query.status) {
    filter.status = req.query.status;
  }
  if (req.query.effort_lte || req.query.effort_gte) {
    filter.effort = {};
  }
  if (req.query.effort_lte) {
    filter.effort.$lte = parseInt(req.query.effort_lte,10); // eslint-disable-line
  }
  if (req.query.effort_gte) {
    filter.effort.$gte = parseInt(req.query.effort_gte,10); // eslint-disable-line
  }
  mongodb.collection('issues').find(filter).toArray()
  .then(issues => {
    const metadata = { total_count: issues.length };
    res.json({ _metadata: metadata, records: issues });
  })
  .catch(error => {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.post('/api/issues', (req, res) => {
  const newIssue = req.body;
  // 以后做数据保护
  // newIssue.id = issues.length + 1;

  newIssue.created = new Date();
  if (!newIssue.status) {
    newIssue.status = 'New';
  }

  const err = Issue.validateIssue(newIssue);
  if (err) {
    res.status(422).json({ message: `Invalid requrest:${err}` });
    return;
  }
  mongodb.collection('issues').insertOne(newIssue).then(result =>
    mongodb.collection('issues').find({ '_id': result.insertedId }).limit(1) // eslint-disable-line
    .next()
  )
  .then(theNewIssue => {
    console.log(theNewIssue)
    res.json(theNewIssue);
  })
  .catch(error => {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});
// register
app.post('/api/IMRongCloudToken', (req,res) => {
  // res = Util.origin(req,res);
  const body = req.body;
  if (!body) {
    return res.status(400).json({ message: `Bad Request Error: ${body}` });
  }
  var filter = {userId:null,userName:null};
  if(body.type==='U2FsdGVkX19SolPjY5hCQfad7/uT4TJt'){
    filter = Util.decrypt(filter,body);
  }else{
    filter = Util.filter(filter,body);
  }
  const akId = Config.IMRongCloudAccessKey.keyId;
  const akSecret = Config.IMRongCloudAccessKey.keyValue;
  const RongSDK = rongCloud({appkey:akId,secret:akSecret});
  const User = RongSDK.User;
  const user = {
    id:''+filter.userId,
    name:''+filter.userName,
    portrait:'http://api.cn.ronghub.com/user/getToken.json'
  };

  User.register(user).then(result => {
    res.json(result);
  },err => {
    console.log(err);
    res.status(500).json({ message: `Internal Server Error: ${err}` });
  });

});

app.post('/api/faceConstrat', (req, res) => {
  res = Util.origin(req,res);
  const akId = Config.faceAccessKey.keyId;
  const akSecret = Config.faceAccessKey.keyValue;
  let date = new Date().toUTCString();
  const options = {
    url: Config.faceContrastHost + '/face/verify',
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: {
      'accept': "application/json", // eslint-disable-line
      "content-type": "application/json", // eslint-disable-line
      'date': date, // eslint-disable-line
      'Authorization': '' // eslint-disable-line
    },
  };
  const md5 = (buffer) => {
    const hash = crypto.createHash('md5');
    hash.update(buffer);
    return hash.digest('base64');
  };
  const sha1 = (stringToSign, secret) => crypto.createHmac('sha1', secret)
  .update(stringToSign).digest()
  .toString('base64');
  const bodya = options.body || '';
  let bodymd5;
  if (bodya === void 0 || bodya === '') {
    bodymd5 = bodya;
  } else {
    bodymd5 = md5(new Buffer(bodya));
  }
  let stringToSign = options.method +  // eslint-disable-line
  '\n' + options.headers.accept +
  '\n' + bodymd5 + '\n' + options.headers['content-type'] +
  '\n' + options.headers.date + '\n' +
  url.parse(options.url).path;

  const signature = sha1(stringToSign, akSecret);
  const authHeader = 'Dataplus ' + akId + ':' + signature;
  options.headers.Authorization = authHeader;
  const callback = (error, response, body) => {
    if (error) {
      console.log('error', error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
      return;
    }
    const sendData = {
      responseCode: response.statusCode,
      bodyData: body,
    };
    res.json(sendData);
  };
  request(options, callback);
});


// 返回中文编码有问题！
// app.get('/api/address', (req, res) => { 
//   const ip = Util.ipAddress(req);
//   const options = {
//     url: 'http://whois.pconline.com.cn/ipJson.jsp?ip='+'171.214.187.144',
//     method: 'GET',
//   };
//   var callback = (error, response, body) => {
//     console.log(body.trim());
//     console.log(newBody.trim());
//     if (error) {
//       console.log('error', error);
//       res.status(500).json({ message: `Internal Server Error: ${error}` });
//       return;
//     }
//     const sendData = {
//       responseCode: response.statusCode,
//       bodyData: body,
//     };
//     console.log(sendData)
//     res.json(sendData);
//   };
//   request(options, callback);
// });
// 所有请求
app.get('*', (req, res) => {
  // let options = {
  //   accessKeyId:'LTAIe....b2jRHX',
  //   accessKeySecret:'LvgYBI...CdJJ1mfj1RYH8'
  // };
  // let client = new Client(options);
  // let signatureString = client.signature("bbg");
  // res.cookie('author',options.accessKeyId+':'+signatureString,{ maxAge: 600000 });
  res.sendFile(path.resolve('static/index.html'));
});
