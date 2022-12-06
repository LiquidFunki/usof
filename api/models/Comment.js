const conn = require("../db/db");
const connection = require("../db/db");

module.exports = class Comment {
  constructor(model) {
    // console.log("created post");
    // console.log(model);
    this.id =  model.id ||0;
    this.author_id = model.author_id;
    this.publish_date = model.publish_date;
    this.content = model.content;
    this.post_id = model.post_id;
    this.status = model.status || "active";
  }

  async isExist(id) {
    const query_str = `SELECT * FROM comment WHERE id='${id}'`; 
    const result = await conn.promise().query(query_str);
    return result[0].length > 0;
  }

  async findBy(property, value) {
    const query_str = `SELECT * FROM comment WHERE ${property}='${value}'`;
    const result = await conn.promise().query(query_str);
    console.log(query_str);
    if (result[0].length > 0) {
      this.id = result[0][0]["id"];
      this.author_id = result[0][0]["author_id"];
      this.publish_date = result[0][0]["publish_date"];
      this.content = result[0][0]["content"];
      this.post_id = result[0][0]["post_id"];
      this.status = result[0][0]["status"];
      return this;
    } else {
      return null;
    }
  }

  static async findAllBy(property, value) {//?????????????????? STATIC?????????
    const query_str = `SELECT * FROM comment WHERE ${property}='${value}'`;
    const result = await conn.promise().query(query_str);
    const postsArr = [];
    for (let x = 0; x < result[0].length; x++) {
      const item = result[0][x];
      postsArr.push(
        new Comment({
        id: item["id"],
        author_id: item["author_id"],
        publish_date: item["publish_date"],
        content: item["content"],
        post_id: item["post_id"],
        status: item["status"]
      }));
    }
    return postsArr;
  }

  static async findAllByActive(property, value) {//?????????????????? STATIC?????????
    const query_str = `SELECT * FROM comment WHERE (${property}='${value}' AND status='active')`;
    const result = await conn.promise().query(query_str);
    const postsArr = [];
    for (let x = 0; x < result[0].length; x++) {
      const item = result[0][x];
      postsArr.push(
        new Comment({
        id: item["id"],
        author_id: item["author_id"],
        publish_date: item["publish_date"],
        content: item["content"],
        post_id: item["post_id"],
        status: item["status"]
      }));
    }
    return postsArr;
  }


  static async getAll() {//usage: const cards = await Card.getAll(); 
    const query_str = `Select * FROM comment`;
    const result = await connection.promise().query(query_str);
    if (result[0].length){
      return result[0];
    } else {
      return null;
    }
  }

  async delete(property, value){
    const query_str = `DELETE FROM comment WHERE ${property}='${value}'`;
    await conn.promise().query(query_str);
  }

  async save(){
    const query_str = `INSERT INTO comment(author_id, publish_date, content, post_id, status) VALUES('${this.author_id}', '${this.publish_date}', '${this.content}', '${this.post_id}', '${this.status}')`;
    console.log(this);
    await conn.promise().query(query_str).then(err=>console.log(err));
  }

  async update() {
    if (await this.isExist(this.id)) {
      const query_str = `UPDATE comment SET status='${this.status}', content='${this.content}' WHERE id='${this.id}'`;
      await conn.promise().query(query_str);
    } else {
      throw new Error('no such comment found');
    }
  }
};
