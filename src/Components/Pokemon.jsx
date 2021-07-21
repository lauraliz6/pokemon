import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import GenTypeDropdown from "./GenTypeDropdown";
import PokemonDropdown from "./PokemonDropdown";
import Party from "./Party";

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

  function getPokemon() {
    axios
      .get("http://localhost:5000/poke", {
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

  function pickPokemon() {
    const picked = document.getElementById("pokePick").value;
    setInPoke(picked);
    axios
      .get("http://localhost:5000/poke", {
        crossdomain: true,
        params: { name: picked },
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
      `http://localhost:5000/pokelist?gen=${enGen}&type=${enType}`
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
        <Col>
          <Container
            style={{
              width: "590px",
              margin: "0",
            }}
          >
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

          <Card style={{ width: "30%" }}>
            <p>Direct search: (if you know what you want)</p>
            <input
              type="text"
              id="pokeName"
              value={inPoke}
              onChange={handleChange}
            />
            <Button variant="primary" onClick={getPokemon}>
              Generate Pokemon
            </Button>

            <p>Narrow by Generation and/or Type</p>
            <GenTypeDropdown />
            <Button variant="secondary" onClick={listPokemon}>
              Go
            </Button>
            <br />
            <br />
            <PokemonDropdown list={pokeList} />
            <Button variant="primary" onClick={pickPokemon}>
              Generate Pokemon
            </Button>
          </Card>
        </Col>

        <Party party={party} />
      </Row>
    </Container>
  );
}
export default Pokemon;
