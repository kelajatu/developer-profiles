import React from "react";
import { Button } from "semantic-ui-react";

const Third = props => {
  return (
    <div>
      <h1>PAGE 3</h1>
      <Button onClick={() => alert("Last item")}>PAGE 3</Button>
    </div>
  );
};

export default Third;
