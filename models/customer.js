const mongoose = require("mongoose");
const yup = require("yup");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
  },
});

const validateCustomer = (customer) => {
  const schema = yup.object().shape({
    name: yup.string().required().min(5).max(50),
    isGold: yup.boolean().default(false),
    phone: yup.string().required(),
  });
  return schema.validate(customer, { abortEarly: false });
};

const Customer = mongoose.model("Customer", customerSchema);
module.exports = { Customer, validateCustomer };
