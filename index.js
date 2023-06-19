const express = require("express");
const cors = require('cors');
const app = express();
const db = require("./src/config/config");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

const PORT = process.env.PORT || 3001;
const route = require("./src/routes/routes");
const joiErrorHandler = require("./src/errorhandlers/requestErrorHandler");

app.use("/index", async (req, res) => {
  res.send("Inventory sytem")
})

app.use('/inventory', route);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


joiErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`)
  // db.sequelize.sync({ alter: true })
})