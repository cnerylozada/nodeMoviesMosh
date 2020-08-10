const mongoose = require("mongoose");
const dbURL =
  "mongodb+srv://cnerylozada:19467381Abc@nodeninja.pwwtx.mongodb.net/mosh-movies?retryWrites=true&w=majority";

const connectToMongoAtlas = () => {
  return mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectToMongoAtlas;
