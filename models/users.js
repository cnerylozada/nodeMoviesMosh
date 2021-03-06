const mongoose = require("mongoose");
const yup = require("yup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const {
  isValidEmail,
  tokenExpiratonTimeInSeconds,
} = require("../util/methods");

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
  isAdmin: {
    type: Boolean,
  },
});

userSchema.methods.getToken = function () {
  return jwt.sign(
    { user: { id: this._id, email: this.email, isAdmin: this.isAdmin } },
    config.get("jwtPrivateKey"),
    {
      expiresIn: tokenExpiratonTimeInSeconds,
    }
  );
};

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!!user) {
    const auth = await bcrypt.compare(password, user.password);
    if (!!auth) return user;
    throw Error(
      JSON.stringify({
        status: 404,
        message: "Invalid email or password",
      })
    );
  }
  throw Error(
    JSON.stringify({
      status: 404,
      message: "User not found",
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
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  });
  return schema.validate(user, { abortEarly: false });
};

exports.User = mongoose.model("User", userSchema);
