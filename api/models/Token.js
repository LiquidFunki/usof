const conn = require("../db/db");
//maybe add isactivated & activation link fields

module.exports = class Token {
  // constructor(author_id = 0, refresh_token = "") {
  //   this.id = 0;
  //   this.author_id = author_id;
  //   this.refresh_token = refresh_token;
  // }

  constructor(model) {
    this.id = 0;
    this.author_id = model.author_id;
    this.refresh_token = model.refresh_token;
  }

  async isExist(author_id) {//changed here from id to author_id
    const query_str = `SELECT * FROM token WHERE author_id='${author_id}'`; 
    const result = await conn.promise().query(query_str);
    return result[0].length > 0;
  }

  async findBy(property, value) {
    const query_str = `SELECT * FROM token WHERE ${property}='${value}'`;
    const result = await conn.promise().query(query_str);
    if (result[0].length > 0) {
      this.id = result[0][0]["id"];
      this.author_id = result[0][0]["author_id"];
      this.refresh_token = result[0][0]["refresh_token"];
      return this; 
    } else {
      return null;
    }
  }

  async delete(property, value){
    const query_str = `DELETE FROM token WHERE ${property}='${value}'`;
    await conn.promise().query(query_str);
  }

  async save() {
    if (await this.isExist(this.id)) {
      const query_str = `UPDATE token SET refresh_token='${this.refresh_token}' WHERE id='${this.id}'`;
      await conn.promise().query(query_str);
    } else {
      const query_str = `INSERT INTO token(author_id, refresh_token) VALUES('${this.author_id}', '${this.refresh_token}')`;
      await conn.promise().query(query_str);
    }
  }
};
