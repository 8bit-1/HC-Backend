const fs = require('fs');
const { createPool } = require('mysql2/promise');

const serverCa = [fs.readFileSync(__dirname + '/BaltimoreCyberTrustRoot.crt.pem', 'utf8')];

// config\BaltimoreCyberTrustRoot.crt.pem
// console.log(serverCa);

const db = createPool({
  host: process.env.DB_HOST || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || '',
  ssl: {
    rejectUnauthorized: true,
    ca: serverCa,
  },
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
});

module.exports = db;
