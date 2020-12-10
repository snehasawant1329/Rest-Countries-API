import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation/Navigation";
import HomePage from "./components/HomePage/HomePage";
import CountryDetails from "./components/CountryDetails/CountryDetails";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Shadow from "./components/Shadow/Shadow";

function App() {
  const [isModeLight, setIsModeLight] = useState(true);
  const [countriesData, setCountriesData] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [filteredCountriesData, setFilteredCountriesData] = useState([]);
  const [filters, setFilters] = useState();
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    fetch(getApiLink("region", selectedFilter))
      .then((response) => response.json())
      .then((data) => {
        setFilteredCountriesData(
          calculateSearchFilterResult(searchInputValue, data)
        );
      });
  }, [selectedFilter]);

  useEffect(() => {
    fetch(getApiLink("", "all"))
      .then((response) => response.json())
      .then((data) => {
        setCountriesData(data);
        setFilteredCountriesData(data);
        setFilters(getFilters(data));
      });
  }, []);

  const getApiLink = (filter, filterValue) => {
    return `
    https://restcountries.eu/rest/v2/${
      filterValue.toLowerCase() !== "all" ? filter + "/" + filterValue : "all"
    }`;
  };

  const getFilters = (data) => {
    var resArr = [];
    data.forEach(function (item) {
      var i = resArr.findIndex((x) => x === item.region);
      if (i <= -1) {
        resArr.push(item.region);
      }
    });
    return ["All", ...resArr];
  };

  const calculateDropdownFilterResult = (selectedFilter, initialData) => {
    return selectedFilter.toLowerCase() !== "all"
      ? initialData.filter((item) => item.region === selectedFilter)
      : initialData;
  };

  const calculateSearchFilterResult = (searchedFilter, initialData) => {
    return searchedFilter !== ""
      ? initialData.filter((item) =>
          item.name.toLowerCase().includes(searchedFilter)
        )
      : initialData;
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
    let initialFilteredData = calculateDropdownFilterResult(
      selectedFilter,
      countriesData
    );
    setSearchInputValue(value);
    setFilteredCountriesData(
      calculateSearchFilterResult(value.toLowerCase(), initialFilteredData)
    );
  };

  const handleSelectedFilterChange = (e, item) => {
    setSelectedFilter(item);
  };

  return (
    <div className="App">
      <div className={isModeLight ? "light" : "dark"}>
        <Shadow>
          <Navigation
            isModeLight={isModeLight}
            onModeClick={() => setIsModeLight(!isModeLight)}
          />
        </Shadow>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage
                data={filteredCountriesData}
                filters={filters}
                selectedFilter={selectedFilter}
                searchInputValue={searchInputValue}
                changeSelectedFilter={handleSelectedFilterChange}
                handleInputChange={handleInputChange}
              />
            </Route>

            <Route path={`/:countryName`}>
              <CountryDetails />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

function Home() {}

export default App;
   