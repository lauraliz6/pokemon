import React, { useState, useEffect } from "react";

import Form from "react-bootstrap/Form";

function PokemonDropdown(props) {
  const passPoke = (event) => {
    props.parentCallback(event.target.value);
  };

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
    <Form style={{ margin: "0px 0 30px" }}>
      <Form.Control as="select" id="pokePick" onChange={passPoke}>
        {list.map((item) => {
          return (
            <option key={item} value={item}>
              {capitalize(item, "-", "false")}
            </option>
          );
        })}
      </Form.Control>
    </Form>
  );
}

export default PokemonDropdown;
