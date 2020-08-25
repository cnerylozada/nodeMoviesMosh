const mongoose = require("mongoose");
const yup = require("yup");
const genre = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
  },
});

exports.validateGenre = (genre) => {
  const schema = yup.object().shape({
    name: yup.string().min(5).max(30).required(),
  });
  return schema.validate(genre);
};
exports.Genre = mongoose.model("Genre", genre);
exports.genreSchema = genre;
