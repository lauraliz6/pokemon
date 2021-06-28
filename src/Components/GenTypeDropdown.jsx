import React, { useState, useEffect } from "react";
import axios from "axios";

function GenTypeDropdown() {
  const [gLoading, setgLoading] = React.useState(true);
  const [genList, setGens] = useState([{ label: "Loading...", value: "" }]);
  const [gValue, setgValue] = useState();

  useEffect(() => {
    let unmounted = false;
    async function getGens() {
      const response = await fetch("http://localhost:5000/list");
      const body = await response.json();
      if (!unmounted) {
        setGens(
          body.gens.results.map(({ name }) => ({ label: name, value: name }))
        );
        setgLoading(false);
      }
    }
    getGens();
    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <select
      disabled={gLoading}
      value={gValue}
      onChange={(e) => setgValue(e.currentTarget.value)}
    >
      {genList.map((gen) => (
        <option key={gen.value} value={gen.value}>
          {gen.label}
        </option>
      ))}
    </select>
  );
}

export default GenTypeDropdown;
