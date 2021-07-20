import React from "react";

import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";

function Party(props) {
  const party = props.party;

  return (
    <Card style={{ width: "30%" }}>
      <Card.Title>My Party</Card.Title>
      {party.map((p, index) => (
        <Figure key={index}>
          <Figure.Image src={p.img} alt={p.name} />
          <Figure.Caption>{p.name}</Figure.Caption>
        </Figure>
      ))}
    </Card>
  );
}

export default Party;
