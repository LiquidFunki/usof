const conn = require("../db/db");
const connection = require("../db/db");

module.exports = class Category {
  constructor(model) {
    // console.log("created category");
    // console.log(model);
    this.id = model.id || 0;
    this.title = model.title;
    this.description = model.description || "";
  }

  async isExist(title) {
    const query_str = `SELECT * FROM category WHERE title='${title}'`; 
    const result = await conn.promise().query(query_str);
    return result[0].length > 0;
  }

  async findBy(property, value) {
    const query_str = `SELECT * FROM category WHERE ${property}='${value}'`;
    const result = await conn.promise().query(query_str);
    if (result[0].length > 0) {
      this.id = result[0][0]["id"];
      this.title = result[0][0]["title"];
      this.description = result[0][0]["description"];
      return this;
    } else {
      return null;
    }
  }

  async findAllBy(property, value) {
    const query_str = `SELECT * FROM category WHERE ${property}='${value}'`;
    const result = await conn.promise().query(query_str);
    const categoriesArr = [];
    for (let x = 0; x < result[0].length; x++) {
      const item = result[0][x];
      categoriesArr.push({
        id: item["id"],
        title: item["title"],
        description: item["description"]
      });
    }
    return categoriesArr;
  }


  static async getAll() {//usage: const cards = await Card.getAll(); 
    const query_str = `Select * FROM category`;
    const result = await connection.promise().query(query_str);
    if (result[0].length){
      return result[0];
    } else {
      return null;
    }
  }

  async delete(property, value){
    const query_str = `DELETE FROM category WHERE ${property}='${value}'`;
    await conn.promise().query(query_str);
  }

  async save() {
    if (await this.isExist(this.title)) {
      const query_str = `UPDATE category SET title='${this.title}', description='${this.description}' WHERE id='${this.id}'`;
      await conn.promise().query(query_str);
    } else {
      const query_str = `INSERT INTO category(title, description) VALUES('${this.title}', '${this.description}')`;
      await conn.promise().query(query_str);
    }
  }
};
