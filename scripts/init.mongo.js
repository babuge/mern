db = new Mongo().getDB('issuetracker');
db.issues.remove({});
db.issues.insert([{
    status: 'Open',
    owner: 'Ravan',
    created: new Date('2018-03-06'),
    effort: 4,
    completionDate: undefined,
    title: 'Error in console when clicking Add',
}, {
    status: 'Assigned',
    owner: 'Eddie',
    created: new Date('2018-03-04'),
    effort: 13,
    completionDate: new Date('2018/04/10'),
    title: 'Error in console when clicking Add',
}, {
    status: 'New',
    owner: 'Mavn',
    created: new Date('2018-04-12'),
    effort: 1,
    completionDate: undefined,
    title: 'Error in console when clicking Add',
}, ]);

db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created: 1 });