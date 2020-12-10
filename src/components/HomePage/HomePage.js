import React from "react";
import "./HomePage.scss";
import Elements from "./Elements/Elements";
import FilteredFields from "./FiltersFields/FiltersFields";

function HomePage(props) {
  return (
    <div className="HomePage">
      <FilteredFields
        filters={props.filters}
        searchInputValue={props.searchInputValue}
        selectedFilter={props.selectedFilter}
        changeSelectedFilter={props.changeSelectedFilter}
        handleInputChange={props.handleInputChange}
      />
      {props.data.length > 0 ? (
        <Elements data={props.data} />
      ) : (
        <div className="messageContainer">
          <p>
            No Countries with a name <b>{props.searchInputValue}</b> and{" "}
            <b>{props.selectedFilter}</b> region
          </p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
