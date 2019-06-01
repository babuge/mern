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


db.article.insert([{
    useId: 1,
    author: 'babuge',
    titleCount:1,
    name: 'javascript',
    cooperator: ["hudong","fouke","babuge"],
    subTitle: '一段文字简介说明，该篇文章内容...',
    titleContent:'JavaScript是一门很好的语言'
},{
    useId: 1,
    author: 'babuge',
    titleCount:1,
    name: 'angular',
    cooperator: ["hudong","fouke"],
    subTitle: '一段文字简介说明，该篇文章内容...',
    titleContent:'angular是一个很好的JavaScript框架'
},{
    useId: 1,
    author: 'babuge',
    titleCount:1,
    name: 'react',
    cooperator: ["babuge"],
    subTitle: '一段文字简介说明',
    titleContent:'react，很好的ui组件'
},{
    useId: 1,
    author: 'babuge',
    titleCount:1,
    name: 'vue',
    cooperator: ["hudong","fouke","babuge"],
    subTitle: '一段文字简介说明，该篇文章内容...',
    titleContent:'vue是一门很好的javascript框架'
},{
    useId: 1,
    author: 'babuge',
    titleCount:1,
    name: 'node',
    cooperator: ["hudong","fouke","babuge"],
    subTitle: '一段文字简介内容...',
    titleContent:'one is all，node打开js后端'
},{
    useId: 1,
    author: 'babuge',
    titleCount:1,
    name: 'ionic',
    cooperator: ["babuge"],
    subTitle: '文字简介说明...',
    titleContent:'ionic是好的手机应用交互ui框架'
},{
    useId: 1,
    author: 'babuge',
    titleCount:1,
    name: 'webpack',
    cooperator: ["babuge"],
    subTitle: '一段文字简介说明 ..',
    titleContent:'好的流水线部署工具，webpack+'
},{
    useId: 1,
    author: 'babuge',
    titleCount:1,
    name: 'bootstrap',
    cooperator: ["hudong","fouke","babuge"],
    subTitle: '一段文字简介说明，该篇文章内容...',
    titleContent:'bootstrap是一门很好的web应用ui框架'
},{
    useId: 1,
    author: 'babuge',
    titleCount:1,
    name: 'linux',
    cooperator: ["hudong","fouke","babuge"],
    subTitle: '一段文字简介说明...',
    titleContent:'大牛都从linux开始'
},{
    useId: 1,
    author: 'babuge',
    titleCount:1,
    name: 'webgl',
    cooperator: ["hudong","fouke","babuge"],
    subTitle: '一段文字简介说明，该篇文章内容...',
    titleContent:'web级的3d视觉应用'
},{
    useId: 1,
    author: 'babuge',
    titleCount:1,
    name: 'threejs',
    cooperator: ["hudong","fouke","babuge"],
    subTitle: '一段文字简介说明，该篇文章内容...',
    titleContent:'基于webgl的web3d框架'
},{
    useId: 1,
    author: 'babuge',
    titleCount:1,
    name: 'html',
    cooperator: ["hudong","fouke","babuge"],
    subTitle: '一段文字简介...',
    titleContent:'会JavaScript的都会它，但没它不行，不精通不是好的前端'
},{
    useId: 1,
    author: 'babuge',
    titleCount:1,
    name: 'less',
    cooperator: ["hudong","fouke","babuge"],
    subTitle: '一段文字简介说明，该篇文章内容...',
    titleContent:'css的优化框架less，使css更易于管理'
},{
    useId: 1,
    author: 'babuge',
    titleCount:1,
    name: 'css',
    cooperator: ["hudong","fouke","babuge"],
    subTitle: '一段文字简介说明，该篇文章内容...',
    titleContent:'会html的也都会，定义元素的效果'
},{
    useId: 1,
    author: 'babuge',
    titleCount:1,
    name: 'scss',
    cooperator: ["hudong","fouke","babuge"],
    subTitle: '一段文字简介说明...',
    titleContent:'scss好的应用都基于sass，scss；而非直接用css？'
}]);
