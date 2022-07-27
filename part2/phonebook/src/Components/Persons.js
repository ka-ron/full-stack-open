import React from "react";
import "../index.css";

const Persons = ({ filter2, handleRemove, newFilter, showFilter }) => {
  const FilterMap2 = filter2.filter((fltr) =>
    fltr.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div>
      <h1>Numbers:</h1>

      <h3>{showFilter ? "Filtered:" : null}</h3>

      {FilterMap2.map((person) => (
        <div key={person.id}>
          {" "}
          <li>
            {person.name} {person.number}{" "}
            <button
              onClick={handleRemove}
              type="button"
              value={person.id}
              name={person.name}
            >
              {" "}
              remove{" "}
            </button>
          </li>
        </div>
      ))}
    </div>
  );
};

export default Persons;
