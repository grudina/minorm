
export default {
  connection: {
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || 'local',
    password: process.env.hasOwnProperty('MYSQL_PASS') ? process.env.MYSQL_PASS : 'freeware',
    database: process.env.MYSQL_DB || 'minorm_test'
  }
}