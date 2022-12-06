const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: "./.env" });


const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

console.log(process.env.DB_HOST);
console.log(process.env.USER);
console.log();


con.connect(async (err) => {
  if (err) throw err;
  console.log("usof DB CREATED!");
  await con.promise().query("CREATE DATABASE IF NOT EXISTS usof");
  con.destroy();
});