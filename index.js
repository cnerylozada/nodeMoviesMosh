const express = require("express");
const connectToMongoAtlas = require("./startup/db");

const app = express();

const setPORT = async () => {
  await connectToMongoAtlas();
  const port = process.env.PORT || 8000;
  app.listen(port);
};

setPORT();
require("./startup/routes")(app);
