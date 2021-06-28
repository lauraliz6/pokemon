import React, { useState, useEffect } from "react";
import axios from "axios";

import GenTypeDropdown from "./GenTypeDropdown";
import PokemonDropdown from "./PokemonDropdown";

function Pokemon() {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [inPoke, setInPoke] = useState("");
  const [pokeList, setPokeList] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    setInPoke(e.target.value);
  };

  function getPokemon() {
    axios
      .get("https://pure-shore-76323.herokuapp.com/poke", {
        crossdomain: true,
        params: { name: inPoke },
      })
      .then((response) => {
        setName(response.data.name);
        setImg(response.data.img);
      });
  }

  function pickPokemon() {
    const picked = document.getElementById("pokePick").value;
    setInPoke(picked);
    axios
      .get("https://pure-shore-76323.herokuapp.com/poke", {
        crossdomain: true,
        params: { name: picked },
      })
      .then((response) => {
        setName(response.data.name);
        setImg(response.data.img);
      });
  }

  async function listPokemon() {
    const inGen = document.getElementById("inGen").value;
    const inType = document.getElementById("inType").value;
    const enGen = encodeURIComponent(inGen);
    const enType = encodeURIComponent(inType);
    const response = await fetch(
      `https://pure-shore-76323.herokuapp.com/pokelist?gen=${enGen}&type=${enType}`
    );
    const body = await response.json();
    setPokeList(body);
    setLoading(false);
  }

  return (
    <div>
      <div>
        <h1>{name}</h1>
        <img src={img} alt={name} />
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
    </div>
  );
}
export default Pokemon;
