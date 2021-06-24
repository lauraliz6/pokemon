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

app.get("/poke", function (req, res) {
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

// const inGen = req.query.gen;
// P.getGenerationByName(inGen)
//   .then(function (response) {
//     let typeList = [];
//     const types = response.types;
//     for (const type of types) {
//       typeList.push(type.name);
//     }
//     res.send(typeList);
//   })
//   .catch(function (error) {
//     console.log("There was an ERROR: ", error);
//   });

app.get("/list", function (req, res) {
  const lists = {};
  P.getGenerationsList()
    .then(function (response1) {
      lists.gens = response1;
    })
    .then(
      P.getTypesList()
        .then(function (response2) {
          lists.types = response2;
        })
        .then(() => res.send(lists))
    );
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port, function () {
  console.log("Server started successfully");
});
