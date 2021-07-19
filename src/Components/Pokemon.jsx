import React, { useState, useEffect } from "react";
import axios from "axios";

import GenTypeDropdown from "./GenTypeDropdown";
import PokemonDropdown from "./PokemonDropdown";
import Party from "./Party";

function Pokemon() {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [weight, setWeight] = useState("");
  const [abilities, setAbilities] = useState([]);
  const [inPoke, setInPoke] = useState("");
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

  //NEED TO ADD - LIMIT TO 6; NO DUPLICATES; INCLUDE PICTURE, WEIGHT, ABILITIES
  const addToParty = () => {
    if (inPoke) {
      setParty([...party, { name: inPoke }]);
    }
  };

  return (
    <div>
      <div>
        <h1>{name}</h1>
        <img src={img} alt={name} />
        <p>Weight: {weightToLb(weight)} lb</p>
        <p>Abilities:</p>
        <ol>
          {abilities.map((abil) => (
            <li key={abil.ability.name} value={abil.ability.name}>
              {capitalize(abil.ability.name, "-", "false")}
            </li>
          ))}
        </ol>
        <button onClick={addToParty}>Save to My Party</button>
      </div>

      <div>
        <p>Direct search: (if you know what you want)</p>
        <input
          type="text"
          id="pokeName"
          value={inPoke}
          onChange={handleChange}
        />
        <button onClick={getPokemon}>Generate Pokemon</button>
      </div>

      <div>
        <p>Narrow by Generation and/or Type</p>
        <GenTypeDropdown />
        <button onClick={listPokemon}>Go</button>
        <br />
        <br />
        <PokemonDropdown list={pokeList} />
        <button onClick={pickPokemon}>Generate Pokemon</button>
      </div>

      <Party party={party} />
    </div>
  );
}
export default Pokemon;
