const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://ka-ron:${password}@cluster0.nvick.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Persons = mongoose.model("Persons", personSchema);

if (process.argv.length === 3) {
  mongoose.connect(url).then(() => {
    console.log("phonebook:");

    Persons.find({}).then((result) => {
      result.forEach((person) => {
        console.log(person.name + " " + person.number);
      });
      return mongoose.connection.close();
    });
  });
} else {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected");

      const person = new Persons({
        name: process.argv[3],
        number: process.argv[4],
      });

      return person.save();
    })
    .then(() => {
      console.log(
        `added ${process.argv[3]} with number ${process.argv[4]} to the phonebook`
      );
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}
