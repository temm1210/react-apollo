import pool from "../mySql";
import queries from "./iniQueries";

(async function initTable() {
  try {
    const conn = await pool.getConnection(async connection => connection);
    try {
      console.log(" ---- Creating tables start ---- ");

      // 비동기 순차실행
      const promise = queries.reduce((prev, current) => {
        return prev.then(() => {
          return conn.query(current);
        });
      }, Promise.resolve());

      // 순차실행이 끝나고 난 후 마지막 실행되어야 할 로직
      promise.then(() => {
        console.log(" ---- All tables are created ---- ");
        conn.release();
        process.exit(0);
      });
    } catch (error) {
      console.error("Query Error");
      throw error;
    }
  } catch (err) {
    console.error("DB Error");
    throw err;
  }
})();
