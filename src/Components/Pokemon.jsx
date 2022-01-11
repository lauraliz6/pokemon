import React, { useState } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import GenTypeDropdown from "./GenTypeDropdown";
import PokemonDropdown from "./PokemonDropdown";
import Party from "./Party";

import { backendLink } from "./backend";

function Pokemon() {
  const [name, setName] = useState("Pikachu");
  const [img, setImg] = useState(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
  );
  const [weight, setWeight] = useState("60");
  const [abilities, setAbilities] = useState([
    { ability: { name: "static" } },
    { ability: { name: "lightning Rod" } },
  ]);
  const [inPoke, setInPoke] = useState("Pikachu");
  const [pokeList, setPokeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [party, setParty] = useState([]);

  const handleChange = (e) => {
    setInPoke(e.target.value);
  };

  const handleSelect = (dropDownData) => {
    setInPoke(dropDownData);
    console.log(inPoke);
  };

  function getPokemon() {
    axios
      .get(backendLink + "poke", {
        crossdomain: true,
        params: { name: inPoke },
      })
      .then((response) => {
        setName(response.data.name);
        setImg(response.data.img);
        setWeight(response.data.weight);
        setAbilities(response.data.abilities);
      });
  }

  async function listPokemon() {
    const inGen = document.getElementById("inGen").value;
    const inType = document.getElementById("inType").value;
    const enGen = encodeURIComponent(inGen);
    const enType = encodeURIComponent(inType);
    const response = await fetch(
      backendLink + `pokelist?gen=${enGen}&type=${enType}`
    );
    const body = await response.json();
    setPokeList(body);
    setLoading(false);
  }

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

  const weightToLb = (weight) => {
    const kg = weight / 10;
    const lb = kg * 2.2046;
    const pounds = Math.round(lb);
    return pounds;
  };

  const addToParty = () => {
    let inParty = party.find((member) => member.name === inPoke);
    if (inPoke && party.length < 6 && !inParty) {
      setParty([
        ...party,
        { name: name, img: img, lbs: weightToLb(weight), abils: abilities },
      ]);
    }
  };

  return (
    <Container>
      <Row>
        <Col style={{ alignItems: "center", width: "590px", margin: "0" }}>
          <Container style={{ padding: "0" }}>
            <Row style={{ alignItems: "center", border: "1px solid black" }}>
              <Col>
                <img src={img} alt={name} style={{ width: "275px" }} />
              </Col>
              <Col>
                <h2>{name}</h2>
                <p>Weight: {weightToLb(weight)} lb</p>
                <p>Abilities:</p>
                <ol>
                  {abilities.map((abil) => (
                    <li key={abil.ability.name} value={abil.ability.name}>
                      {capitalize(abil.ability.name, "-", "false")}
                    </li>
                  ))}
                </ol>
              </Col>
            </Row>
            <Row>
              {party.length < 6 && (
                <Button
                  variant="secondary"
                  onClick={addToParty}
                  style={{ borderRadius: "0" }}
                >
                  Add to My Party
                </Button>
              )}
            </Row>
          </Container>

          <Container fluid style={{ padding: "0" }}>
            <Row
              style={{
                alignItems: "center",
                border: "1px solid black",
                padding: "30px 40px",
              }}
            >
              <h2 style={{ paddingBottom: "10px" }}>Search</h2>
              <InputGroup>
                <InputGroup.Text>By name:</InputGroup.Text>
                <Form.Control type="text" id="pokeName" onBlur={handleChange} />
              </InputGroup>

              <Form style={{ margin: "20px 0" }}>
                <Form.Label>Narrow by generation and/or type</Form.Label>
                <Col>
                  <GenTypeDropdown listPokemon={listPokemon} />
                </Col>
              </Form>
              <PokemonDropdown list={pokeList} parentCallback={handleSelect} />
              <Col>
                <Button
                  variant="primary"
                  onClick={getPokemon}
                  style={{ width: "100%" }}
                >
                  Generate Pokemon
                </Button>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col>
          <Party party={party} />
        </Col>
      </Row>
    </Container>
  );
}
export default Pokemon;
