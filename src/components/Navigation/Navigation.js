import React from "react";
import "./Navigation.scss";
import { faMoon as fasMoon } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navigation(props) {
  return (
    <div className="Navigation">
      <div className="NavigationItems">
        <p className="Navigation-left">Where in the world?</p>
        <div className="mode-container" onClick={props.onModeClick}>
          <div className="moonIcon">
            {props.isModeLight ? (
              <FontAwesomeIcon icon={faMoon} />
            ) : (
              <FontAwesomeIcon icon={fasMoon} />
            )}
          </div>
          <p className="mode-text">Dark Mode</p>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
