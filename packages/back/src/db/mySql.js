import mysql from "mysql2/promise";
import createTable from "db/initQuery/makeTable";

const pool = mysql.createPool({
  connectionLimit: 10,
  connectTimeout: 20000,
  host: process.env.db_host,
  user: process.env.db_user,
  port: Number.parseInt(process.env.db_port, 10),
  password: process.env.db_password,
  database: process.env.db_database,
});

createTable(pool);

export default pool;
