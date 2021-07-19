const db = require('./db.config');

async function queryCon(sql, params) {
  let results;
  db.getConnection(function (err, conn) {
    if (err) throw err; //no conecta

    conn.query('SELECT 1 + 1 AS solution', function (err, results, fields) {
      console.log('The solution is: ', results);

      conn.release();

      // handle error after release
      if (err) throw error;
    });

    conn.release();
  });
  return [results];
}

async function queryParam(sql, params) {
  const [results] = await db.execute(sql, params);
  return results;
}

async function query(sql) {
  const [results] = await db.query(sql);
  return results;
}

module.exports = {
  query,
  queryParam,
  queryCon,
};
