const express = require("express");
const connectToMongoAtlas = require("./startup/db");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();

const setPORT = async () => {
  await connectToMongoAtlas();
  const port = process.env.PORT || 8000;
  app.listen(port);
};

require("./startup/cors")(app);
setPORT();
app.use(cookieParser());
app.use(morgan("tiny"));
require("./startup/routes")(app);
