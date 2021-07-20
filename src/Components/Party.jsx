import React from "react";

function Party(props) {
  const party = props.party;

  return (
    <div>
      <h2>My Party</h2>
      {party.map((p, index) => (
        <div key={index}>
          <img src={p.img} alt={p.name} />
          <p>{p.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Party;
