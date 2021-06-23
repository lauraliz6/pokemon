import React, { useState } from "react";
import axios from "axios";
function Pokemon() {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  function getPokemon() {
    const pokeName = document.getElementById("pokeName").value;
    axios
      .get("http://localhost:5000/poke", {
        crossdomain: true,
        params: { name: pokeName },
      })
      .then((response) => {
        setName(response.data.name);
        setImg(response.data.img);
      });
  }

  function listPokemon() {
    const pokeGen = document.getElementById("pokeGen").value;
    axios
      .get("http://localhost:5000/gens", {
        crossdomain: true,
        params: { gen: pokeGen },
      })
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <div>
      <div>
        <p>Direct search: (if you know what you want)</p>
        <input type="text" id="pokeName" />
        <button onClick={getPokemon}>Generate Pokemon</button>
      </div>

      <div>
        <p>Narrow by Generation and/or Type</p>
        <select id="pokeGen" onChange={listPokemon}>
          <option value="all">All</option>
          <option value="generation-i">Generation I</option>
          <option value="generation-ii">Generation II</option>
          <option value="generation-iii">Generation III</option>
          <option value="generation-iv">Generation IV</option>
          <option value="generation-v">Generation V</option>
          <option value="generation-vi">Generation VI</option>
          <option value="generation-vii">Generation VII</option>
          <option value="generation-viii">Generation VIII</option>
        </select>
        <select id="pokeType" onChange={listPokemon}>
          <option value="all">All</option>
          <option value="normal">Normal</option>
          <option value="fighting">Fighting</option>
          <option value="flying">Flying</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="rock">Rock</option>
          <option value="bug">Bug</option>
          <option value="ghost">Ghost</option>
          <option value="steel">Steel</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="fairy">Fairy</option>
          <option value="unknown">Unknown</option>
          <option value="shadow">Shadow</option>
        </select>
      </div>

      <div>
        <h1>{name}</h1>
        <img src={img} alt={name} />
      </div>
    </div>
  );
}
export default Pokemon;
