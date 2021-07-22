import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import trashIcon from "../img/trashcan.png";

function Party(props) {
  const party = props.party;

  return (
    <Container
      style={{
        alignItems: "center",
        border: "1px solid black",
        padding: "15px 40px",
        height: "100%",
      }}
    >
      <h2>My Party</h2>
      {party.map((p, index) => (
        <Row key={index} style={{ alignItems: "center" }}>
          <Col sm={4}>
            <img src={p.img} alt={p.name} style={{ width: "95px" }} />
          </Col>
          <Col>
            <p>{p.name}</p>
          </Col>
          <Col>
            <Button variant="outline-light">
              <img src={trashIcon} alt="trashcan" />
            </Button>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default Party;
