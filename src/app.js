const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const db = require("./utils/database");
const initModels = require("./models/init.models");
const routerApi = require("./routes");
const http = require("http");

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type, Authorization, Your-Other-Headers",
};

const httpServer = http.createServer(app);
httpServer.listen(8000, () => {
  console.log("Servidor HTTP en el puerto 8000");
});

app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("tiny"));

initModels();
db.authenticate()
  .then(() => console.log("BD authenticate"))
  .catch((error) => console.log(error));

db.sync({ force: false })
  .then(() => console.log("db synched"))
  .catch((error) => console.log(error));

routerApi(app);

module.exports = app;
