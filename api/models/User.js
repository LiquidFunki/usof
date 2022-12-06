const connection = require("../db/db");
const conn = require("../db/db");

module.exports = class User {
  
  constructor(model) {//maybe add activation link field 
    // console.log("created new user");
    // console.log(model);
    this.id = 0;
    this.login = model.login;
    this.password = model.password;
    this.full_name = model.full_name || "";
    this.email = model.email;
    this.profile_pic = model.profile_pic || "default.png";
    this.rating = model.rating || 0;
    this.role = model.role || "user";
    this.is_active = model.is_active || 0;
    this.activation_link = model.activation_link;
  }

  async isExist(email) {
    const query_str = `SELECT * FROM user WHERE email='${email}'`; 
    const result = await conn.promise().query(query_str);
    return result[0].length > 0;
  }

  async plusRating(id){
    
    this.rating += 1;
    const query_str = `UPDATE user SET rating='${this.rating}' WHERE id='${id}'`;//mb remake for email
    await conn.promise().query(query_str);
  }

  async minusRating(id){
    this.rating -= 1;
    const query_str = `UPDATE user SET rating='${this.rating}' WHERE id='${id}'`;//mb remake for email
    await conn.promise().query(query_str);
  }

  async findBy(property, value) {
    const query_str = `SELECT * FROM user WHERE ${property}='${value}'`;
    const result = await conn.promise().query(query_str);
    if (result[0].length > 0) {
      this.id = result[0][0]["id"];
      this.login = result[0][0]["login"];
      this.password = result[0][0]["password"];
      this.full_name = result[0][0]["full_name"];
      this.email = result[0][0]["email"];
      this.profile_pic = result[0][0]["profile_pic"];
      this.rating = result[0][0]["rating"];
      this.role = result[0][0]["role"];
      this.is_active = result[0][0]["is_active"];
      this.activation_link = result[0][0]["activation_link"];
      return this; 
    } else {
      return null;
    }
  }

  async delete(property, value){
    const query_str = `DELETE FROM user WHERE ${property}='${value}'`;
    await conn.promise().query(query_str);
  }

    static async getAll() {//usage: const cards = await Card.getAll(); 
    const query_str = `Select * FROM user`;
    const result = await connection.promise().query(query_str);
    if (result[0].length){
      return result[0];
    } else {
      return null;
    }
  }

  async save() {//maybe add to update activation link(at this moment makes no sense for me)
    if (await this.isExist(this.email)) {
      const query_str = `UPDATE user SET login='${this.login}', full_name='${this.full_name}', password='${this.password}', profile_pic='${this.profile_pic}', rating='${this.rating}', role='${this.role}', is_active='${this.is_active}', activation_link='${this.activation_link}' WHERE email='${this.email}'`;
      await conn.promise().query(query_str);
    } else {
      const query_str = `INSERT INTO user(login, password, full_name, email, profile_pic, rating, role, is_active, activation_link) VALUES('${this.login}', '${this.password}', '${this.full_name}', '${this.email}', '${this.profile_pic}', '${this.rating}', '${this.role}', '${this.is_active}', '${this.activation_link}')`;
      await conn.promise().query(query_str);
    }
  }
};
