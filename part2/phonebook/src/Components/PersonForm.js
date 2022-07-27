import React from "react";
import "../index.css";

const PersonForm = ({
  addName,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <div>
      <h3>Add a new name + number:</h3>
      <h5>or use a already submitted name to update a number</h5>

      <form onSubmit={addName}>
        <div>
          name: <input className="space" value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add info</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
