import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Second = props => {
  return (
    <div>
      <h1>PAGE 2</h1>
      <Link to="/third">
        <Button onClick={() => props.addToNavBar("/third", "SETTINGS")}>
          Click for Page 3
        </Button>
      </Link>
    </div>
  );
};

export default Second;
