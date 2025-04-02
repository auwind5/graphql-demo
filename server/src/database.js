const mysql = require('mysql')

export const initDBConnection = () => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'demo',
  })
  connection.connect(function (err) {
    if (err) throw err
    console.log('Connected!')
  })
  return connection
}
