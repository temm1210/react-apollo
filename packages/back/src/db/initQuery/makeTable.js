import queries from "./iniQueries";

async function createTable(pool) {
  try {
    const conn = await pool.getConnection(async connection => connection);
    // 비동기 순차실행
    const promise = queries.reduce((prev, current) => {
      return prev.then(() => {
        return conn.query(current);
      });
    }, Promise.resolve());

    // 순차실행이 끝나고 난 후 마지막 실행되어야 할 로직
    return promise.then(() => {
      conn.release();
      // process.exit(0);
    });
  } catch (error) {
    throw error;
  }
}

export default createTable;
