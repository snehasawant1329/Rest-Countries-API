import React, { useEffect, useState } from "react";
import "./CountryDetails.scss";
import DetailPageButton from "./DetailPageButton/DetailPageButton";
import { Link, useParams } from "react-router-dom";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CountryDetails(props) {
  const { countryName } = useParams();
  const [countryData, setCountrtData] = useState(null);
  const [countryDataBorders, setCountrtDataBorders] = useState([]);

  useEffect(() => {
    fetch(`https://restcountries.eu/rest/v2/name/${countryName.toLowerCase()}`)
      .then((response) => response.json())
      .then((data) => {
        setCountrtData(data[0]);
        let borderCountriesList = [];
        let borderCountriesLength = data[0].borders.length;
        data[0].borders.map((border, index) =>
          fetch(
            `https://restcountries.eu/rest/v2/alpha/${border.toLowerCase()}`
          )
            .then((response) => response.json())
            .then((data) => {
              borderCountriesList.push(data);
              if (index === borderCountriesLength - 1) {
                setCountrtDataBorders(borderCountriesList);
              }
            })
        );
      });
  }, [countryName]);
  return (
    <div className="CountryDetails">
      {countryData ? (
        <div className="CountryDetailsItems">
          <div className="backButtonContainer">
            <Link to={`/`}>
              <DetailPageButton>
                <div className="buttonInnerContainer">
                  <div className="backArrowIcon">
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </div>
                  <p>Back</p>
                </div>
              </DetailPageButton>
            </Link>
          </div>
          <div className="countryContainer">
            <div className="flag detailPart">
              <div
                className="imageContainer"
                style={{ backgroundImage: `url(${countryData.flag})` }}
              ></div>
            </div>
            <div className="detailsContainer detailPart">
              <h2>{countryData.name}</h2>
              <div className="details">
                <div className="mainDetails">
                  <div className="mainDetailsFirst">
                    <p>
                      <span>Native Name: </span>
                      {countryData.nativeName}
                    </p>
                    <p>
                      <span>Population: </span>
                      {countryData.population}
                    </p>
                    <p>
                      <span>Region: </span>
                      {countryData.region}
                    </p>
                    <p>
                      <span>Subregion: </span>
                      {countryData.subregion}
                    </p>
                    <p>
                      <span>Capital: </span>
                      {countryData.capital}
                    </p>
                  </div>
                  <div className="mainDetailsSecond">
                    <p>
                      <span>Top Level Domain: </span>
                      {countryData.topLevelDomain}
                    </p>
                    <p>
                      <span>Currencies: </span>
                      {countryData.currencies.map(
                        (currency) => `${currency.code}, `
                      )}
                    </p>
                    <p>
                      <span>Languages: </span>
                      {countryData.languages.map(
                        (language) => `${language.name}, `
                      )}
                    </p>
                  </div>
                </div>
                <div className="borderCountriesSectionContainer">
                  <div className="borderCountriesSection">
                    <p>
                      <span>Border Countries: </span>
                    </p>
                    <div className="borderCountries">
                      {countryDataBorders
                        ? countryDataBorders.map((border) => (
                            <Link to={`/${border.name}`} key={border.name}>
                              <DetailPageButton
                                onClick={() => setCountrtData(border.name)}
                              >
                                <p>{border.name}</p>
                              </DetailPageButton>
                            </Link>
                          ))
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CountryDetails;
