import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import CountryInfo from "./components/CountryInfo";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [showResults, setShowResults] = useState(true);
  const [text, setText] = useState("Enter input");
  const [showCountry, setShowCountry] = useState(false);

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  const handleButtonClick = () => {
    console.log("pressed button");

    setShowCountry(!showCountry);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const countryToShow = countries.filter((countryts) =>
    countryts.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const filteredCountry = countries
    .filter((fltr) =>
      fltr.name.common.toLowerCase().includes(filter.toLowerCase())
    )
    .map((filteredName, i) => (
      <li key={i}>
        {" "}
        {filteredName.name.common}{" "}
        <button onClick={handleButtonClick}> Show/Hide preview</button>
        <h5>
          {" "}
          {showCountry ? (
            <CountryInfo toShow={showCountry} info={countryToShow[i]} />
          ) : null}
        </h5>
      </li>
    ));

  useEffect(() => {
    if (filteredCountry.length === 1) {
      console.log(" 1 match");
      setShowResults(false);
      setShowCountry(true);
      setText("");
    } else if (filteredCountry.length === 250) {
      console.log("empty (all counties)");
      setShowResults(false);
      setShowCountry(false);
      setText("enter a country");
      setFilter("");
    } else if (filteredCountry.length > 9) {
      console.log("too many results");
      setShowResults(false);
      setShowCountry(false);
      setText("Too many countries found (10 +) Please specify search");
    } else if (filteredCountry.length < 1) {
      console.log("0 matches");
      setShowCountry(false);
      setShowResults(false);
      setText("0 counties found, please try again");
    } else if (filteredCountry.length > 1 && filteredCountry.length < 9) {
      console.log("show matches between 1 and 10");
      setShowResults(true);
      setShowCountry(false);
    } else {
      setShowCountry(false);
      setShowResults(false);
    }
  }, [filteredCountry.length]);

  return (
    <div>
      <h1>Countries</h1>

      <h4>
        find countries: <input value={filter} onChange={handleFilterChange} />
      </h4>
      <h5>{showResults ? filteredCountry : text} </h5>

      <h5>
        {" "}
        {showCountry ? (
          <CountryInfo toShow={showCountry} info={countryToShow[0]} />
        ) : null}
      </h5>
      <h5>___________________</h5>
    </div>
  );
}

export default App;
