import React, { useState, useEffect } from "react";
import axios from "axios";
function Pokemon() {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [inPoke, setInPoke] = useState("");
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
      });
  }

  const listPokemon = function (callback) {
    axios
      .get("http://localhost:5000/list", {
        crossdomain: true,
      })
      .then((response) => {
        let genList = [];
        const gList = response.data.gens.results;
        for (var i = 0; i < gList.length; i++) {
          let gen = gList[i];
          genList.push(gen.name);
        }
        let typeList = [];
        const tList = response.data.types.results;
        for (var j = 0; j < tList.length; j++) {
          let type = tList[j];
          typeList.push(type.name);
        }
        const listInfo = {};
        listInfo.gens = genList;
        listInfo.types = typeList;
        callback(listInfo);
      });
  };

  function getPokeList() {
    const selectedGen = document.getElementById("pokeGen").value;
    const selectedType = document.getElementById("pokeType").value;
    const pokeList = document.getElementById("pokeList");
    if (selectedGen === "all" && selectedType === "all") {
      alert("please select at least one drop down to narrow by");
      return;
    }
    let commonPs;
    axios
      .get("http://localhost:5000/pokelist", {
        crossdomain: true,
        params: { gen: selectedGen, type: selectedType },
      })
      .then((response) => {
        commonPs = response.data;
      })
      .then(() => {
        pokeList.innerHTML = "";
        setInPoke(commonPs[0]);
        for (var c = 0; c < commonPs.length; c++) {
          let pokeName = commonPs[c];
          let propName = capitalize(pokeName, "-", "false");
          pokeList.innerHTML += `<option value="${pokeName}">${propName}</option>`;
        }
      });
  }

  useEffect(() => {
    listPokemon(function (response) {
      const selectGen = document.getElementById("pokeGen");
      const selectType = document.getElementById("pokeType");
      selectGen.innerHTML = "<option value='all'>All</option>";
      selectType.innerHTML = "<option value='all'>All</option>";
      const gens = response.gens;
      for (var g = 0; g < gens.length; g++) {
        let genName = gens[g];
        let propGenName = capitalize(genName, "-", "true");
        selectGen.innerHTML += `<option value="${genName}">${propGenName}</option>`;
      }
      const types = response.types;
      for (var t = 0; t < types.length; t++) {
        let typeName = types[t];
        let propTypeName = typeName.charAt(0).toUpperCase() + typeName.slice(1);
        selectType.innerHTML += `<option value="${typeName}">${propTypeName}</option>`;
      }
    });
  });

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
        <select id="pokeGen">
          <option value="all">All</option>
        </select>
        <select id="pokeType">
          <option value="all">All</option>
        </select>
        <button onClick={getPokeList}>Go</button>
        <br />
        <select id="pokeList" onChange={handleChange}></select>
        <button onClick={getPokemon}>Generate Pokemon</button>
      </div>
    </div>
  );
}
export default Pokemon;
