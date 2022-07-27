import React from "react";
import Weather from "./Weather";

const CountryInfo = ({ toShow, info }) => {
  if (toShow) {


    const data = Object.entries(info.languages).map(([key, value]) => (
      <li key={key}> {value}</li>
    ));

    return (
      <div>
        <h1>{info.name.common}</h1>
        <p> capital {info.capital}</p>
        <p>area {info.area}</p>

        <b> Languages:</b>
        <ul>
          {data}
        </ul>

        <img src={info.flags.png} alt="flag" />

        <Weather city={info.capital} />
      </div>
    );
  }
};
export default CountryInfo;
