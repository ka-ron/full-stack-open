const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

const Persons = require("./models/person");

morgan.token("data", function data(request) {
  return JSON.stringify(request.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

const currentday = new Date();

app.get("/api/persons", (request, response) => {
  Persons.find({}).then((personsFound) => {
    response.json(personsFound);
  });
});

app.get("/info", (request, response) => {
  Persons.find({}).then((personsFound) => {
    response.send(
      `<h1>Info </h1> <p>Current amount of entries in Phonebook: ${personsFound.length} </p> <p>${currentday}</p>`
    );
    console.log(personsFound.length);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Persons.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  if (!body) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const person = new Persons({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  Persons.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Persons.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
