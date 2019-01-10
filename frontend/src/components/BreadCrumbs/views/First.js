import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const First = props => {
  return (
    <div>
      <h1>PAGE 1</h1>
      <Link to="/second">
        <Button onClick={() => props.addToNavBar("/second", "USER")}>
          Click for Page 2
        </Button>
      </Link>
    </div>
  );
};

export default First;
