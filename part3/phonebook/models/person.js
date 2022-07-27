const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const numberValidator = [
  {
    validator: (number) => {
      if ((number[2] === "-" || number[3] === "-") && number.length > 8) {
        return true;
      }
      return false;
    },
    message:
      "Number must have 8 digits and in this format: XX-XXXXXX or XXX-XXXXX",
  },
  {
    validator: (number) => {
      return /^\d{2,3}-\d+$/.test(number);
    },
    message: "please use only numbers",
  },
];

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },

  number: {
    type: String,

    validate: numberValidator,
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Persons", personSchema);
