import config from './config.js';
import mysql from 'mysql';

/**配置mysql
 * mysql客户端
 */
const connection = mysql.createConnection(config.mysqldb);

/**公共方法
 * @params name 方法名
 */
const isFunc = (name) => typeof name === 'function';

let sql = {};

/**mysql方法
 * @param sql sql语句
 * @param success 成功callback
 * @param fail 失败callback
 */
sql.query = (sql, success, fail) => {
    connection.connect();
    connection.query(sql,(err, result) => {
        if(err){
            console.log(`[QUERY ERROR] - `,err.message);
            isFunc(fail) && fail(err.message);
            connection.end();
            return;
        }
        isFunc(success) && success(result);
        connection.end();
    })
}

export default sql;