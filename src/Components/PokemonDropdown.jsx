import React, { useState, useEffect } from "react";

function PokemonDropdown(props) {
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

  const list = props.list;
  return (
    <div>
      <select>
        {list.map((item) => {
          // using props in child component and looping
          return (
            <option key={item} value={item}>
              {capitalize(item, "-", "false")}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default PokemonDropdown;
