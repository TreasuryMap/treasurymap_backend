const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const db = require("./utils/database");
const initModels = require("./models/init.models");
const routerApi = require("./routes");
//require("./models/associations.models.js");

const corsOptions = {
  origin: "https://treasurymap.vercel.app", // O reemplázalo con el dominio específico de tu frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Permite incluir cookies en las solicitudes (si es necesario)
  optionsSuccessStatus: 204,
  allowedHeaders: "Content-Type, Authorization, Your-Other-Headers",
};

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
