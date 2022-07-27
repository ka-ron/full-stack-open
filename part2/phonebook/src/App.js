import { useState, useEffect } from "react";

import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import personService from "./services/persons";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState("");
  const [showText, setShowText] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  //GET

  useEffect(() => {
    personService

      .getAll()
      .then((initialNotes) => {
        setPersons(initialNotes);
      })
      .catch((error) => {
      });
  }, []);

  //Handle

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);

    const filterOn = event.target.value;

    if (filterOn) {
      setShowFilter(true);
    } else {
      setShowFilter(false);
    }
  };

  const handleRemove = (event) => {
    event.preventDefault();
    const id = event.target.value;

    if (window.confirm(`Delete ${event.target.name}?`)) {
      personService
        .remove(id)
        .then((response) => {
          const updatedPerson = persons.filter((person) => person.id !== id);
          setPersons(updatedPerson);

          setMessage(` ${event.target.name} deleted from phonebook`);
          setShowText(!showText);
          setTimeout(() => {
            setShowText(false);
          }, 5000);

          console.log("removed");
        })
        .catch((error) => {
          console.error(error);
          setMessage(`Error deleting ${event.target.name} from phonebook`);
          setShowError(!showError);
          setTimeout(() => {
            setShowError(false);
          }, 5000);
        });
    }
  };

  const addName = (event) => {
    event.preventDefault();

    const nameObject = {
      name: newName,
      number: newNumber,
    };

    const result = persons.find(({ name }) => name === newName);

    if (result === undefined) {
      setPersons(persons.concat(nameObject));
      const copy = Array.from(persons);
      setPersons(copy);
      setNewName("");
      setNewNumber("");

      personService
        .create(nameObject)
        .then((response) => {
          setPersons(persons.concat(nameObject));
          setNewName("");
          setNewNumber("");

          setMessage(` ${newName} added to phonebook`);
          setShowText(!showText);
          setTimeout(() => {
            setShowText(false);
          }, 5000);
        })

        .catch((error) => {
          setMessage(`Error adding ${newName} to phonebook`);
          setMessage(`${error.response.data.error}`);
          setShowError(!showError);
          setTimeout(() => {
            setShowError(false);
          }, 5000);
        });
    } else {
      const oldPerson = persons.find((p) => p.name === newName);
      const newPerson = { ...oldPerson, number: newNumber };
      setNewName("");
      setNewNumber("");

      if (
        window.confirm(
          `${newName} is already added to the phonebook,replace the old number with the new one ?`
        )
      ) {
        personService.update(oldPerson.id, newPerson).then((changedPerson) => {
          const updatedPerson = persons.map((person) =>
            person.id !== oldPerson.id ? person : changedPerson
          );
          setPersons(updatedPerson);
        });
        setMessage(` ${newName} has a updated number`);
        setShowText(!showText);
        setTimeout(() => {
          setShowText(false);
        }, 5000).catch((error) => {
          setMessage(` error adding ${newName}  to phonebook`);
          setShowError(!showError);
          setTimeout(() => {
            setShowText(false);
          }, 5000);
        });
      }
    }
  };

  return (
    <div className="main">
      <h2 className="heading">Phonebook</h2>
      <h2 className="approved">{showText ? message : null}</h2>
      <h2 className="error">{showError ? message : null}</h2>

      <Filter
        title="Use filter:"
        subtitle="filter:"
        filterName={newFilter}
        handleChange={handleFilterChange}
      />
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Persons
        filter2={persons}
        handleRemove={handleRemove}
        newFilter={newFilter}
        showFilter={showFilter}
      />
    </div>
  );
};

export default App;
