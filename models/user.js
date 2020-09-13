const mongoose = require("mongoose");
const yup = require("yup");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) =>
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(v),
      test: "Enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!!user) {
    const auth = await bcrypt.compare(password, user.password);
    if (!!auth) return user;
    throw Error(
      JSON.stringify({
        status: 400,
        message: "Bad password",
      })
    );
  }
  throw Error(
    JSON.stringify({
      status: 404,
      message: "Invalid credentials",
    })
  );
};

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

exports.validateUser = (user) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .required()
      .test("is-email", "Enter a valid email", (v) =>
        /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(v)
      ),
    password: yup.string().min(7).required(),
  });
  return schema.validate(user, { abortEarly: false });
};

exports.User = mongoose.model("User", userSchema);
