const express = require("express");
const config = require("config");
const connectToMongoAtlas = require("./startup/db");
const morgan = require("morgan");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

const setPORT = async () => {
  await connectToMongoAtlas();
  const port = process.env.PORT || 8000;
  app.listen(port);
};

require("./startup/cors")(app);
setPORT();
app.use(morgan("tiny"));
require("./startup/routes")(app);
