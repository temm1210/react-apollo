export default class DBApi {
  constructor(pool) {
    this.pool = pool;
  }

  async query(sql, values) {
    try {
      const con = await this.pool.getConnection(async conn => conn);

      const [rows] = await con.query(sql, values);
      con.release();
      return rows;
    } catch (err) {
      throw new Error(err);
    }
  }

  getFields(data) {
    return Object.keys(data).map(value => `${value}=?`);
  }

  getInsertFields(data) {
    return Object.keys(data).reduce((prev, current) => `${prev},${current}`);
  }

  getFieldValues(data) {
    return Object.values(data);
  }

  getQuestionMark(data) {
    const valueLength = data.length;
    let questionStr = "?";

    let i = 0;
    while (i < valueLength - 1) {
      questionStr += ",?";
      i += 1;
    }

    return questionStr;
  }
}
