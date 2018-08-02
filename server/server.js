import path from 'path';
import 'babel-polyfill';
import SourceMapSupport from 'source-map-support';
import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import Issue from './issue.js';
import { request } from 'request';
import { url } from 'url';
import { crypto } from 'crypto';
SourceMapSupport.install(); // 源映射显示行号

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json()); // bodyParser.json()创建中间件 并用 app.use()在应用层应用它

let db;
MongoClient.connect('mongodb://localhost:27017/issuetracker').then(connection => {
  db = connection;
  app.listen(3000, () => {
    console.log('App started on port 3000');
  });
}).catch(err => {
  console.log('ERROR:', err);
});

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
  console.log(filter);
  db.collection('issues').find(filter).toArray()
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
  db.collection('issues').insertOne(newIssue).then(result =>
    db.collection('issues').find({ '_id': result.insertedId }).limit(1) // eslint-disable-line
    .next()
  )
  .then(theNewIssue => {
    res.json(theNewIssue);
  })
  .catch(error => {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.get('/api/faceConstrat', (req, res) => {
  console.log(1);
  console.log(req.body);
  const akId = 'LTA..4xZX';
  const akSecret = 'YvJN4..btq';
  const date = new Date().toUTCString();
  const options = {
    url: '/face/verify',
    method: 'GET',
    body: { test: '123' },
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
  const authHeader = 'Dataplus' + akId + ':' + signature;
  options.headers.Authorization = authHeader;
  const callback = (error, response, body) => {
    if (error) {
      console.log('error', error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    }
    console.log('stop4:', response.statusCode, body);
    const sendData = {
      responseCode: response.statusCode,
      bodyData: body,
    };
    res.json(sendData);
  };
  request(options, callback);
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('static/index.html'));
});

