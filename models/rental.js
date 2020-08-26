const mongoose = require("mongoose");
const yup = require("yup");
const { customerSchema } = require("./customer");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: customerSchema,
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        validate: {
          validator: (v) => Number.isInteger(v),
          message: "dailyRentalRate must be an integer",
        },
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
  },
  dateReturned: {
    type: Date,
    required: true,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

exports.validateRental = (rental) => {
  const schema = yup.object().shape({
    customer: yup.string().required,
  });
};

exports.Rental = mongoose.model("Rental", rentalSchema);
