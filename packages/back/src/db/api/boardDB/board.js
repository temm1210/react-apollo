import { boardFields } from "../../schemas";
import DBApi from "../DBApi";

export default class BoardDB extends DBApi {
  async getBoard(data) {
    const whereFields = this.getFields(data);
    const values = this.getFieldValues(data);
    try {
      const board = await this.query(
        `SELECT
          ${boardFields.ID}, ${boardFields.USERNAME},
          ${boardFields.TITLE}, ${boardFields.CONTENT}, 
          ${boardFields.LIKES}, ${boardFields.VIEWS},
          ${boardFields.REPRESENT_IMG},${boardFields.CREATE_DATE},
          ${boardFields.UPDATE_DATE}
        FROM
          BOARD
        WHERE
          ${whereFields[0]}`,
        values,
      );

      // 유저가 존재하지 않을시 return undefined
      return board && board[0];
    } catch (err) {
      console.error("getUser Error::::", err);
      throw err;
    }
  }

  async deleteBoard(id) {
    const result = await this.query(
      `DELETE FROM board WHERE ${boardFields.ID} = ?`,
      [id],
    );
    return result;
  }

  updateBoard(id, board) {
    const fields = this.getFields(board);
    const values = this.getFieldValues(board);

    return this.query(
      `UPDATE BOARD
       SET ${fields}
       WHERE ${boardFields.ID}=?`,
      [...values, id],
    );
  }

  insertBoard(board) {
    try {
      const fields = this.getInsertFields(board);
      const values = this.getFieldValues(board);
      const questionMarker = this.getQuestionMark(values);

      return this.query(
        `INSERT INTO BOARD(${fields}) VALUES(${questionMarker})`,
        values,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async getBoardList(limit, cursor) {
    try {
      const boardList = await this.query(
        `SELECT
          ${boardFields.ID}, ${boardFields.USERNAME},
          ${boardFields.TITLE}, ${boardFields.CONTENT}, 
          ${boardFields.LIKES}, ${boardFields.VIEWS},
          ${boardFields.REPRESENT_IMG},${boardFields.CREATE_DATE},
          ${boardFields.UPDATE_DATE}
        FROM
          BOARD
        ORDER BY
          ${boardFields.CREATE_DATE} desc
        LIMIT
          ${limit}
        OFFSET
          ${cursor}
      `,
      );

      return boardList;
    } catch (error) {
      throw new Error(error);
    }
  }
}
