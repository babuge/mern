import path from 'path';
import 'babel-polyfill';
import SourceMapSupport from 'source-map-support';
import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import Issue from './issue.js';

SourceMapSupport.install(); // 源映射显示行号

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json()); // bodyParser.json()创建中间件 并用 app.use()在应用层应用它

let db;
MongoClient.connect('mongodb://47.92.70.234:27017/issuetracker').then(connection => {
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
    filter.effort.$lte = parseInt(req.query.effort_lte,10);
  }
  if (req.query.effort_gte) {
    filter.effort.$gte = parseInt(req.query.effort_gte,10);
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

app.get('*', (req, res) => {
  res.sendFile(path.resolve('static/index.html'));
});
