const express = require("express");

var Pokedex = require("pokedex-promise-v2");
var P = new Pokedex();

const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function (req, res) {
  const inName = req.query.name;
  P.getPokemonByName(inName) // with Promise
    .then(function (response) {
      const name = response.name;
      const img = response.sprites.front_default;
      const poke = {};
      poke.name = name;
      poke.img = img;
      res.send(poke);
    })
    .catch(function (error) {
      console.log("There was an ERROR: ", error);
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port, function () {
  console.log("Server started successfully");
});
