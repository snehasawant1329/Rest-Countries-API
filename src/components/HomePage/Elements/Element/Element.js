import React from "react";
import "./Element.scss";

function Element(props) {
  return (
    <div className="Element">
      <div className="flag">
        <div
          className="imageContainer"
          style={{ backgroundImage: `url(${props.elementData.flag})` }}
        ></div>
      </div>
      <div className="countryDetails">
        <div className="countryName">{props.elementData.name}</div>
        <p>
          <span>Population: </span>
          {props.elementData.population}
        </p>

        <p>
          <span>Region: </span>
          {props.elementData.region}
        </p>

        <p>
          <span>Capital: </span>
          {props.elementData.capital}
        </p>
      </div>
    </div>
  );
}

export default Element;
