import React, { useState, useEffect } from "react";

function Party(props) {
  const party = props.party;

  return (
    <div>
      <h2>My Party</h2>
      {party.map((p, index) => (
        <p key={index}>{p.name}</p>
      ))}
    </div>
  );
}

export default Party;
