const morgan = require("morgan");
const express = require("express");
const layout = require("./views/layout");
const app = express();
const { db, Page, User } = require("./models");

const db = new Sequelize("postgres://localhost:5432/wikistack", {
  logging: false,
});

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.use(express.static(__dirname + ""));
app.use(morgan("dev"));

app.get("/", function (req, res) {
  res.send(layout());
});

const PORT = 1337;

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

// app.listen(PORT, () => {
//   console.log(`App listening in port ${PORT}`);
// });
