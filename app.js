const morgan = require("morgan");
const express = require("express");
const Sequelize = require("sequelize");
const layout = require("./views/layout");
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/users");
const { db, Page, User } = require("./models"); //took out db here

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + ""));
app.use(morgan("dev"));
app.use(express.json()); //potentially comment thisout

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.get("/", (req, res, next) => {
  res.redirect("/wiki");
});

app.get("/", function (req, res) {
  res.send(layout());
});

app.use("/wiki", wikiRouter);
app.use("/users", userRouter);

const PORT = 3000;

const init = async () => {
  await db.sync({ force: true });
  await Page.sync();
  await User.sync();
  // make sure that you have a PORT constant
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();
