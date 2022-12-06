const conn = require("../db/db");
const connection = require("../db/db");

module.exports = class Post {
  constructor(model) {
    // console.log("created post");
    // console.log(model);
    this.id = 0;
    this.author_id = model.author_id;
    this.title = model.title;
    this.publish_date = model.publish_date;
    this.status = model.status || "active";
    this.content = model.content;
    // this.image_content = model.image_content;
    // this.category = model.category;
  }

  async isExist(id) {
    const query_str = `SELECT * FROM post WHERE id='${id}'`;
    const result = await conn.promise().query(query_str);
    return result[0].length > 0;
  }

  async findBy(property, value) {
    const query_str = `SELECT * FROM post WHERE ${property}='${value}'`;
    const result = await conn.promise().query(query_str);
    if (result[0].length > 0) {
      this.id = result[0][0]["id"];
      this.author_id = result[0][0]["author_id"];
      this.title = result[0][0]["title"];
      this.publish_date = result[0][0]["publish_date"];
      this.status = result[0][0]["status"];
      this.content = result[0][0]["content"];
      // this.image_content = result[0][0]["image_content"];
      // this.category = result[0][0]["category"];
      return this;
    } else {
      return null;
    }
  }

  static async findAllBy(property, value, offset) {
    const query_str = `SELECT * FROM post WHERE ${property}='${value}' LIMIT ${offset}, 10 `;
    const result = await conn.promise().query(query_str);
    const postsArr = [];
    for (let x = 0; x < result[0].length; x++) {
      const item = result[0][x];
      postsArr.push({
        id: item["id"],
        author_id: item["author_id"],
        title: item["title"],
        publish_date: item["publish_date"],
        status: item["status"],
        content: item["content"],
        // image_content: item["image_content"],
        // category: item["category"]
      });
    }
    return postsArr;
  }

  static async getAll(offset = 0, categoriesFilter, userFilter, dateFilter, sort) {
    //usage: const cards = await Card.getAll();
    // const query_str = `Select * FROM post LIMIT ${offset}, 10`;
    // let query_str = "SELECT `post`.`id`, `post`.`title`, `post`.`status`, `post`.`content`, `post`.`publish_date`, `post`.`author_id`, `category`.`id` AS `category_id`, `category`.`title` AS `category_title`, `category`.`description` FROM `post` LEFT OUTER JOIN (`postcategory` AS `category->postcategory` INNER JOIN `category` ON `category`.`id` = `category->postcategory`.`category_id`) ON `post`.`id` = `category->postcategory`.`post_id` WHERE (`post`.`status`  = 'active' OR `post`.`author_id` = 2) AND (`category`.`id` = 1 OR `category`.`id` = 2 OR `category`.`id` = 3) AND `post`.`author_id` = '1' AND `post`.`publish_date` BETWEEN 1663102800000 AND 1665694800000 GROUP BY `post`.`id` LIMIT 0, 5";
    
    
    let str = "SELECT `post`.`id`, `post`.`title`, `post`.`status`, `post`.`content`, `post`.`publish_date`, (SELECT COUNT(likes.id) FROM `likes` WHERE likes.entity_id = post.id AND likes.entity_type = 'post') AS `likeCount` , `post`.`author_id`, `category`.`id` AS `category_id`, `category`.`title` AS `category_title`, `category`.`description` FROM `post` LEFT OUTER JOIN (`postcategory` AS `category->postcategory` INNER JOIN `category` ON `category`.`id` = `category->postcategory`.`category_id`) ON `post`.`id` = `category->postcategory`.`post_id` "; // (post.status = inactive AND post.author_id = 1)
    
    if((categoriesFilter != "null" && categoriesFilter) || (userFilter != "null" && userFilter) || (dateFilter != "null" && dateFilter) ){
      str += " WHERE"
    }
    if(categoriesFilter != "null" && categoriesFilter){
      str += " (";
      // console.log(categoriesFilter);
      // str += " AND"
      // console.log(categoriesFilter.length);
      for(let i = 0; i < categoriesFilter.length; i++){
        str += " `category`.`id` = ";
        str += categoriesFilter[i];
        // console.log(i);
          if(i == categoriesFilter.length - 1){
            str += "";
          } else {
            str += " OR";
          }
      }
      str += " )";
    }

    if(((categoriesFilter != "null" && categoriesFilter) && (userFilter != "null"  && userFilter))){
      // console.log("HERE")
      // console.log(userFilter)
      str += " AND";
    }
    // if((categoriesFilter && categoriesFilter != "null") && (userFilter && userFilter != "null")){
    //   console.log("here")
    //   str += " AND";
    // }

    if(userFilter != "null" && userFilter){
      str += " `post`.`author_id` = ";
      str += userFilter;
    }

    if(((categoriesFilter != "null" && categoriesFilter) && (dateFilter != "null"  && dateFilter)) || ((userFilter != "null" && userFilter) && (dateFilter != "null" && dateFilter))){
      str += " AND";
    }

    if(dateFilter != "null" && dateFilter){//mb set hours and seconds to 0
      const today = Date.now();
      
      let dateByFilter = new Date();
      if(dateFilter == "year"){
        dateByFilter.setFullYear(dateByFilter.getFullYear() - 1);
        dateByFilter = dateByFilter.getTime();
      } else if(dateFilter == "month"){
        dateByFilter.setMonth(dateByFilter.getMonth() - 1);
        dateByFilter = dateByFilter.getTime();
      } else if(dateFilter == "week"){
        dateByFilter.setDate(dateByFilter.getDate() - 7);
        dateByFilter = dateByFilter.getTime();
      }

      str += " `post`.`publish_date` BETWEEN ";
      str += dateByFilter;
      str += " AND ";
      str += today;
      
      // console.log(dateByFilter);
    }
    // str += " GROUP BY `post`.`id` LIMIT 0, 10";
    str += " GROUP BY `post`.`id`";
    str += " ORDER BY ";
    if(sort[0] == "date"){
      str += "`post`.`publish_date` ";
    } else if(sort[0] == "like"){
      str += "`likeCount` ";
    }
    str += sort[1];
    str += " LIMIT ";
    str += offset;
    str += ", 5";//TODO: REPLACE
    // str += " ORDER BY `post`.`publish_date` DESC"
    // ORDER BY column1, column2, ... ASC|DESC;
    console.log(str);

    const result = await connection.promise().query(str);
    if (result[0].length) {
      return result[0];
    } else {
      return null;
    }
  }

  static async getAllByNotAdmin(offset = 0, categoriesFilter, userFilter, dateFilter, userId, sort) {
    //usage: const cards = await Card.getAll();
    // const query_str = `Select * FROM post LIMIT ${offset}, 10`;
    // let query_str = "SELECT `post`.`id`, `post`.`title`, `post`.`status`, `post`.`content`, `post`.`publish_date`, `post`.`author_id`, `category`.`id` AS `category_id`, `category`.`title` AS `category_title`, `category`.`description` FROM `post` LEFT OUTER JOIN (`postcategory` AS `category->postcategory` INNER JOIN `category` ON `category`.`id` = `category->postcategory`.`category_id`) ON `post`.`id` = `category->postcategory`.`post_id` WHERE (`post`.`status`  = 'active' OR `post`.`author_id` = 2) AND (`category`.`id` = 1 OR `category`.`id` = 2 OR `category`.`id` = 3) AND `post`.`author_id` = '1' AND `post`.`publish_date` BETWEEN 1663102800000 AND 1665694800000 GROUP BY `post`.`id` LIMIT 0, 5";
    
    let str = "SELECT `post`.`id`, `post`.`title`, `post`.`status`, `post`.`content`,  (SELECT COUNT(likes.id) FROM `likes` WHERE likes.entity_id = post.id AND likes.entity_type = 'post') AS `likeCount` , `post`.`publish_date`, `post`.`author_id`, `category`.`id` AS `category_id`, `category`.`title` AS `category_title`, `category`.`description` FROM `post` LEFT OUTER JOIN (`postcategory` AS `category->postcategory` INNER JOIN `category` ON `category`.`id` = `category->postcategory`.`category_id`) ON `post`.`id` = `category->postcategory`.`post_id` WHERE (`post`.`status` = 'active'"; // (post.status = inactive AND post.author_id = 1)
    
    if(userId != "null" && userId){
      str += " OR `post`.`author_id` = ";
      str += userId;
    }
    str += ")";

    if(categoriesFilter != "null" && categoriesFilter){
      str += " AND (";
      // console.log(categoriesFilter);
      // str += " AND"
      // console.log(categoriesFilter.length);
      for(let i = 0; i < categoriesFilter.length; i++){
        str += " `category`.`id` = ";
        str += categoriesFilter[i];
        // console.log(i);
          if(i == categoriesFilter.length - 1){
            str += "";
          } else {
            str += " OR";
          }
      }
      str += " )";
    }

    if(userFilter != "null" && userFilter){
      str += " AND `post`.`author_id` = ";
      str += userFilter;
    }

    if(dateFilter != "null" && dateFilter){//mb set hours and seconds to 0
      const today = Date.now();
      
      let dateByFilter = new Date();
      if(dateFilter == "year"){
        dateByFilter.setFullYear(dateByFilter.getFullYear() - 1);
        dateByFilter = dateByFilter.getTime();
      } else if(dateFilter == "month"){
        dateByFilter.setMonth(dateByFilter.getMonth() - 1);
        dateByFilter = dateByFilter.getTime();
      } else if(dateFilter == "week"){
        dateByFilter.setDate(dateByFilter.getDate() - 7);
        dateByFilter = dateByFilter.getTime();
      }

      str += " AND `post`.`publish_date` BETWEEN ";
      str += dateByFilter;
      str += " AND ";
      str += today;
      
      // console.log(dateByFilter);
    }

    str += " GROUP BY `post`.`id`";
    str += " ORDER BY ";
    if(sort[0] == "date"){
      str += "`post`.`publish_date` ";
    } else if(sort[0] == "like"){
      str += "`likeCount` ";
    }
    str += sort[1];
    str += " LIMIT ";
    str += offset;
    str += ", 5";//TODO: REPLACE

    // str += " GROUP BY `post`.`id` LIMIT 0, 10";
    // str += " GROUP BY `post`.`id` LIMIT ";
    // str += offset;
    // str += ", 5";//TODO: REPLACE
    console.log(str);

    const result = await connection.promise().query(str);
    if (result[0].length) {
      return result[0];
    } else {
      return null;
    }
  }

  async delete(property, value) {
    const query_str = `DELETE FROM post WHERE ${property}='${value}'`;
    await conn.promise().query(query_str);
  }

  async save() {
    // const query_str = `INSERT INTO post(author_id, title, publish_date, status, content, image_content, category) VALUES('${this.author_id}', '${this.title}', '${this.publish_date}', '${this.status}', '${this.content}', '${this.image_content}', '${this.category}`;
    const query_str = `INSERT INTO post(author_id, title, publish_date, status, content) VALUES('${this.author_id}', '${this.title}', '${this.publish_date}', '${this.status}', '${this.content}')`;
    console.log(this);
    await conn
      .promise()
      .query(query_str)
      .then((err) => console.log(err));
  }

  async update() {
    if (await this.isExist(this.id)) {
      // const query_str = `UPDATE post SET title='${this.title}', status='${this.status}', content='${this.content}', image_content='${this.image_content}', category='${this.category}' WHERE id='${this.id}'`;
      const query_str = `UPDATE post SET title='${this.title}', status='${this.status}', content='${this.content}' WHERE id='${this.id}'`;
      await conn.promise().query(query_str);
    } else {
      throw new Error("no such post found");
    }
  }
};
