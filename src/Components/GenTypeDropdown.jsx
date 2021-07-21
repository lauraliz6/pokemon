import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function GenTypeDropdown() {
  const [loading, setLoading] = React.useState(true);

  const [genList, setGens] = useState([{ label: "Loading...", value: "" }]);
  const [gValue, setgValue] = useState("all");

  const [typeList, setTypes] = useState([{ label: "Loading...", value: "" }]);
  const [tValue, settValue] = useState("all");

  const capitalize = (s, spl, gen) => {
    let strArr = s.split(spl);
    let arr = "";
    for (var i = 0; i < strArr.length; i++) {
      let curStr = strArr[i];
      let cap = "";
      cap = curStr.charAt(0).toUpperCase() + curStr.slice(1);
      if (gen === "true") {
        if (i === 1) {
          cap = curStr.toUpperCase();
        }
      }
      arr += cap + " ";
    }
    return arr;
  };

  useEffect(() => {
    let unmounted = false;
    async function getGensTypes() {
      const response = await fetch("http://localhost:5000/list");
      const body = await response.json();
      if (!unmounted) {
        setGens(
          body.gens.results.map(({ name }) => ({
            label: capitalize(name, "-", "true"),
            value: name,
          }))
        );
        setTypes(
          body.types.results.map(({ name }) => ({
            label: capitalize(name, " ", "false"),
            value: name,
          }))
        );
        setLoading(false);
      }
    }
    getGensTypes();
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <Row style={{ justifyContent: "stretch" }}>
      <Col md>
        <Form.Control
          as="select"
          disabled={loading}
          value={gValue}
          onChange={(e) => setgValue(e.currentTarget.value)}
          id="inGen"
          style={{ width: "100%" }}
        >
          <option key="all" value="all">
            All
          </option>
          {genList.map((gen) => (
            <option key={gen.value} value={gen.value}>
              {gen.label}
            </option>
          ))}
        </Form.Control>
      </Col>
      <Col md>
        <Form.Control
          as="select"
          disabled={loading}
          value={tValue}
          onChange={(e) => settValue(e.currentTarget.value)}
          id="inType"
        >
          <option key="all" value="all">
            All
          </option>
          {typeList.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </Form.Control>
      </Col>
      <Col sm>
        <Button>Go</Button>
      </Col>
    </Row>
  );
}

export default GenTypeDropdown;
