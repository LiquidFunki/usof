const conn = require("../db/db");

module.exports = class PostCategory {
  constructor(model) {
    // console.log("created postCategory");
    // console.log(model);
    this.post_id = model.post_id;
    this.category_id = model.category_id;
  }

  static async findAllBy(property, value) {
    const query_str = `SELECT * FROM postCategory WHERE ${property}='${value}'`;
    const result = await conn.promise().query(query_str);
    const postCategoriesArr = [];
    for (let x = 0; x < result[0].length; x++) {
      const item = result[0][x];
      postCategoriesArr.push(
        new PostCategory({
          id: item["id"],
          post_id: item["post_id"],
          category_id: item["category_id"],
        })
      );
    }
    return postCategoriesArr;
  }

  async delete(property, value) {
    const query_str = `DELETE FROM postCategory WHERE ${property}='${value}'`;
    await conn.promise().query(query_str);
  }

  async save() {
    const query_str = `INSERT INTO postCategory(post_id, category_id) VALUES('${this.post_id}', '${this.category_id}')`;
    await conn.promise().query(query_str);
  }
};
