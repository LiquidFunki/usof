const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const { Adapter } = require("adminjs-sql");
const bcrypt = require("bcryptjs");
const DB_PORT = 3306;
const mysql = require("mysql2");


const authenticate = async (email, password) => {
  const candidate = { email: "admin1@gmail.com", password: "qwerty1" };
  if (candidate.email !== email || candidate.password !== password) {
    return;
  }
  return Promise.resolve(candidate);
};


async function Init() {
AdminJS.registerAdapter(Adapter);

const db =  await Adapter.init("mysql2", {
         host: process.env.DB_HOST,
         port: DB_PORT,
         user: process.env.USER,
         password: process.env.PASSWORD,
         database: process.env.DATABASE,
 });

// console.log(db);


const admin = new AdminJS({
  databases: [db],
  branding: {
    companyName: "Usof Admin-Panel"
  },
  resources: db.tables(),
//   // or
//   resources: [db.table("users"), db.table("posts"), db.table("comments")],
});

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate,
    cookiePassword: process.env.JWT_ACCESS_SECRET,
  },
  null,
  {
    secret: process.env.JWT_ACCESS_SECRET,
    resave: false,
    saveUninitialized: false,
  }
);

return {adminRouter, admin};
}
module.exports = {  Init };
