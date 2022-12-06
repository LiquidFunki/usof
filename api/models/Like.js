const conn = require("../db/db");

module.exports = class Like {
  constructor(model) {
    // console.log("created like");
    // console.log(model);
    this.id = model.id || 0;
    this.author_id = model.author_id;
    this.publish_date = model.publish_date;
    this.entity_type = model.entity_type;
    this.entity_id = model.entity_id;
    this.type = model.type;
  }

  async isExist(id) {
    const query_str = `SELECT * FROM likes WHERE id='${id}'`; 
    const result = await conn.promise().query(query_str);
    return result[0].length > 0;
  }

  async findBy(property, value) {//add func findByPost/findByComment
    const query_str = `SELECT * FROM likes WHERE ${property}='${value}'`;
    const result = await conn.promise().query(query_str);
    if (result[0].length > 0) {
      this.id = result[0][0]["id"];
      this.author_id = result[0][0]["author_id"];
      this.publish_date = result[0][0]["publish_date"];
      this.entity_type = result[0][0]["entity_type"];
      this.entity_id = result[0][0]["entity_id"];
      this.type = result[0][0]["type"];
      return this;
    } else {
      return null;
    }
  }

  async findByEntity(property, value, entity) {//add func findByPost/findByComment
    const query_str = `SELECT * FROM likes WHERE (${property}='${value}' AND entity_type='${entity}')`;
    const result = await conn.promise().query(query_str);
    if (result[0].length > 0) {
      this.id = result[0][0]["id"];
      this.author_id = result[0][0]["author_id"];
      this.publish_date = result[0][0]["publish_date"];
      this.entity_type = result[0][0]["entity_type"];
      this.entity_id = result[0][0]["entity_id"];
      this.type = result[0][0]["type"];
      return this;
    } else {
      return null;
    }
  }

  async findByEntityAndAuthor(property, value, entity, authorId) {//add func findByPost/findByComment
    const query_str = `SELECT * FROM likes WHERE (${property}='${value}' AND entity_type='${entity}' AND author_id='${authorId}')`;
    const result = await conn.promise().query(query_str);
    if (result[0].length > 0) {
      this.id = result[0][0]["id"];
      this.author_id = result[0][0]["author_id"];
      this.publish_date = result[0][0]["publish_date"];
      this.entity_type = result[0][0]["entity_type"];
      this.entity_id = result[0][0]["entity_id"];
      this.type = result[0][0]["type"];
      return this;
    } else {
      return null;
    }
  }


  static async findAllBy(property, value) {
    const query_str = `SELECT * FROM likes WHERE ${property}='${value}'`;
    const result = await conn.promise().query(query_str);
    const postsArr = [];
    for (let x = 0; x < result[0].length; x++) {
      const item = result[0][x];
      postsArr.push(
        new Like({
        id: item["id"],
        author_id: item["author_id"],
        publish_date: item["publish_date"],
        entity_type: item["entity_type"],
        entity_id: item["entity_id"],
        type: item["type"]
      }));
    }
    return postsArr;
  }
  
  static async findAllByEntity(property, value, entity) {
    const query_str = `SELECT * FROM likes WHERE (${property}='${value}' AND entity_type='${entity}')`;
    const result = await conn.promise().query(query_str);
    const postsArr = [];
    for (let x = 0; x < result[0].length; x++) {
      const item = result[0][x];
      postsArr.push(
        new Like({
        id: item["id"],
        author_id: item["author_id"],
        publish_date: item["publish_date"],
        entity_type: item["entity_type"],
        entity_id: item["entity_id"],
        type: item["type"]
      }));
    }
    return postsArr;
  }

  static async getAll() {//usage: const cards = await Card.getAll(); 
    const query_str = `Select * FROM likes`;
    const result = await connection.promise().query(query_str);
    if (result[0].length){
      return result[0];
    } else {
      return null;
    }
  }

  async delete(property, value){
    // console.log("HERE HERE HERE")
    const query_str = `DELETE FROM likes WHERE ${property}='${value}'`;
    await conn.promise().query(query_str);
  }

  async save() {//mb remake
    if (await this.isExist(this.id)) {
      const query_str = `UPDATE likes SET type='${this.type}', publish_date='${this.publish_date}' WHERE id='${this.id}'`;
      await conn.promise().query(query_str);
    } else {
      const query_str = `INSERT INTO likes(author_id, publish_date, entity_type, entity_id, type) VALUES('${this.author_id}', '${this.publish_date}', '${this.entity_type}', '${this.entity_id}', '${this.type}')`;
      await conn.promise().query(query_str);
    }
  }
};
