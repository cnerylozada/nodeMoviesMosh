const mongoose = require("mongoose");
const yup = require("yup");
const { isValidEmail } = require("../util/methods");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (email) => isValidEmail(email),
      message: "Enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

exports.validateUser = (user) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("isEmai", "Enter a valid email", (email) =>
        isValidEmail(email)
      ),
    password: yup.string().required().min(6),
  });
  return schema.validate(user, { abortEarly: false });
};

exports.User = mongoose.model("User", userSchema);
