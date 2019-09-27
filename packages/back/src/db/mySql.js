import mysql from "mysql2/promise";

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.db_host,
  user: process.env.db_user,
  port: Number.parseInt(process.env.db_port, 10),
  password: process.env.db_password,
  database: process.env.db_database,
});

export default pool;
