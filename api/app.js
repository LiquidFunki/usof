const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const bodyparser = require("body-parser"); //hz nado li uzat`
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error-middleware");
const session = require("express-session");
const { Init } = require("./admin-panel");
const memoryStore = new session.MemoryStore();

const app = express();

app.use(
  session({
    secret: "asfasfasf",
    store: memoryStore,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 10 },
  })
);

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";

const start = async () => {
  try {
    const { admin, adminRouter } = await Init();
    app.use(admin.options.rootPath, adminRouter);
    app.use(express.static('src'));
    app.use(express.json()); // extended: true
    app.use(
      bodyparser.urlencoded({
        extended: true,
      })
    );
    app.use(cors({
      credentials: true,
      origin: process.env.CLIENT_URL
    }));
    // app.use(bodyparser.json())

    app.use(cookieParser());
    app.use("/api/auth", require("./routes/auth.routes"));
    app.use("/api/users", require("./routes/user.routes"));
    app.use("/api/posts", require("./routes/post.routes"));
    app.use("/api/categories", require("./routes/categories.routes"));
    app.use("/api/comments", require("./routes/comments.routes"));
    app.use(errorMiddleware); //middleware for errors always must be last
    app.listen(PORT, () =>
      console.log(`Server is running on http://${HOST}:${PORT}`)
    );
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  } catch (e) {
    console.log(e);
  }
};

start();
