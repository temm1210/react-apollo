import { userFields } from "../../schemas";
import DBApi from "../DBApi";

export default class UserDB extends DBApi {
  async getUser(data) {
    const whereFields = this.getFields(data);
    const values = this.getFieldValues(data);
    try {
      const users = await this.query(
        `SELECT
          ${userFields.EMAIL},${userFields.PASSWORD},${userFields.USERNAME},
          ${userFields.USER_PIC},${userFields.SALT},${userFields.REFRESH_TOKEN},
          ${userFields.CREATE_DATE},
          ${userFields.UPDATE_DATE}
        FROM
          USER
        WHERE
          ${whereFields[0]}`,
        values,
      );

      // 유저가 존재하지 않을시 return undefined
      return users && users[0];
    } catch (err) {
      console.error("getUser Error::::", err);
      throw err;
    }
  }

  async updateUser(email, user) {
    const fields = this.getFields(user);
    const values = this.getFieldValues(user);

    return this.query(
      `UPDATE USER 
       SET ${fields} 
       WHERE ${userFields.EMAIL}=?`,
      [...values, email],
    );
  }

  async insertUser(user) {
    const fields = this.getInsertFields(user);
    const values = this.getFieldValues(user);
    const questionMarkers = this.getQuestionMark(values);

    try {
      return this.query(
        `INSERT INTO USER(${fields}) VALUES(${questionMarkers})`,
        values,
      );
    } catch (err) {
      console.error("INSERT USER ERROR:::", err);
    }
  }
}
