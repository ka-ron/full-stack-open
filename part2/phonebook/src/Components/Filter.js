import React from "react";
import "../index.css";

const Filter = ({ title, subtitle, filterName, handleChange }) => {
  return (
    <>
      <h3>{title}</h3>
      {subtitle} <input className="space2" value={filterName} onChange={handleChange} />
      
    </>
  );
};

export default Filter;
