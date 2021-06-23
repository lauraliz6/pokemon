import React, { useState } from "react";
import axios from "axios";
function Pokemon() {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  function getPokemon() {
    axios
      .get("http://localhost:5000/", { crossdomain: true })
      .then((response) => {
        setName(response.data.name);
        setImg(response.data.img);
      });
  }
  return (
    <div>
      <button onClick={getPokemon}>Generate Pokemon</button>
      <h1>{name}</h1>
      <img src={img} alt={name} />
    </div>
  );
}
export default Pokemon;
