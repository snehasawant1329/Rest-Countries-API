import React from "react";
import "./Elements.scss";
import Element from "./Element/Element";
import { Link } from "react-router-dom";
import Shadow from "../../Shadow/Shadow";

function Elements(props) {
  return (
    <div className="Elements">
      {props.data.map((item) => (
        <div key={item.name}>
          <Link to={`/${item.name}`}>
            <Shadow>
              <Element elementData={item} />
            </Shadow>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Elements;
