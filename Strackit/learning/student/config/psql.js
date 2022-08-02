const fs = require("fs");
const { Pool } = require("pg");
const Client = require("pg").Client;
const config = {
  user: "postgres",
  host: "localhost",
  database: "student details",
  password: "Karthick01@",
  port: 5432,
};
// class EnhancedClient extends Client {
//   getStartupConf() {
//     if (process.env.PG_OPTIONS) {
//       try {
//         const options = JSON.parse(process.env.PG_OPTIONS);
//         return {
//           ...super.getStartupConf(),
//           ...options,
//         };
//       } catch (e) {
//         console.error(e);
//       }
//     }
//     return super.getStartupConf();
//   }
// }
// config.Client = EnhancedClient;
// config.ssl = {
//   rejectUnauthorized: false,
// };
// config.ssl = false;

function getPool() {
  const pool = new Pool(config);
  return pool;
}

let executeQuery = async (q) => {
  const pool = getPool();
  const client = await pool.connect();
  const data = await client.query(q);
  await client.release();
  await pool.end();

  return data;
};

module.exports = {
  executeQuery,
};
