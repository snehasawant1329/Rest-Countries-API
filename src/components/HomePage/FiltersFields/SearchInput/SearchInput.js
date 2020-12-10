import React from "react";
import "./SearchInput.scss";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SearchInput(props) {
  return (
    <div className="SearchInput">
      <div className="searchIcon">
        <FontAwesomeIcon icon={faSearch} />
      </div>
      <div className="inputContainer">
        <input
          placeholder="Search for a country..."
          value={props.searchInputValue}
          onChange={(e) => props.handleInputChange(e)}
        />
      </div>
    </div>
  );
}
export default SearchInput;
