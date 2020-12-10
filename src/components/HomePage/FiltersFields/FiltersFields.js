import React from "react";
import "./FiltersFields.scss";
import SearchInput from "./SearchInput/SearchInput";
import Filter from "./Filter/Filter";
import Shadow from "../../Shadow/Shadow";

function FiltersFields(props) {
  return (
    <div className="FiltersFields">
      <Shadow>
        <SearchInput
          handleInputChange={props.handleInputChange}
          searchInputValue={props.searchInputValue}
        />
      </Shadow>
      <div className="FilterContainer">
        <Shadow>
          <Filter
            filters={props.filters}
            selectedFilter={props.selectedFilter}
            changeSelectedFilter={props.changeSelectedFilter}
          />
        </Shadow>
      </div>
    </div>
  );
}

export default FiltersFields;
