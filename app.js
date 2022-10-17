const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const taskRouter = require("./routes/taskRouter");
const userRouter = require("./routes/userRouter");
const cookieParser = require("cookie-parser");
const path = require("path");
const viewRouter = require("./routes/viewRouter");
const compression = require("compression");
const app = express();
//GLOBAL MIDDLEWARE............
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.json());
app.use(compression());
//DB CONNECTION....
dotenv.config({ path: "./config.env" });
const db = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully !"))
  .catch((err) => {
    console.log(err);
  });
//APP MIDDLEWARES......
app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});
app.use("/", viewRouter);
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/user", userRouter);

const port = process.env.PORT || 8000;
app.listen(port, (err) => {
  console.log(`app is running on port ${port}`);
});
