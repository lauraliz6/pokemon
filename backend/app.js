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

app.get("/pokelist", function (req, res) {
  const inGen = req.query.gen;
  const inType = req.query.type;
  let genPokes = [];
  let typePokes = [];
  if (inGen != "all" && inType != "all") {
    P.getGenerationByName(inGen)
      .then(function (response1) {
        const species = response1.pokemon_species;
        for (const spec of species) {
          genPokes.push(spec.name);
        }
      })
      .catch(function (error) {
        console.log("There was an ERROR: ", error);
      })
      .then(
        P.getTypeByName(inType)
          .then(function (response2) {
            const mons = response2.pokemon;
            for (const mon of mons) {
              typePokes.push(mon.pokemon.name);
            }
          })
          .catch(function (error) {
            console.log("There was an ERROR: ", error);
          })
          .then(() => {
            const pokes = getCommonItems(genPokes, typePokes);
            res.send(pokes);
          })
      );
  } else if (inGen === "all") {
    P.getTypeByName(inType)
      .then(function (response3) {
        const mons = response3.pokemon;
        for (const mon of mons) {
          typePokes.push(mon.pokemon.name);
        }
      })
      .catch(function (error) {
        console.log("There was an ERROR: ", error);
      })
      .then(() => {
        const pokes = typePokes;
        res.send(pokes);
      });
  } else if (inType === "all") {
    P.getGenerationByName(inGen)
      .then(function (response4) {
        const species = response4.pokemon_species;
        for (const spec of species) {
          genPokes.push(spec.name);
        }
      })
      .catch(function (error) {
        console.log("There was an ERROR: ", error);
      })
      .then(() => {
        const pokes = genPokes;
        res.send(pokes);
      });
  }
});

function getCommonItems(array1, array2) {
  var common = []; // Initialize array to contain common items

  for (var i = 0; i < array1.length; i++) {
    for (var j = 0; j < array2.length; j++) {
      if (array1[i] == array2[j]) {
        // If item is present in both arrays
        common.push(array1[i]); // Push to common array
      }
    }
  }

  return common; // Return the common items
}

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port, function () {
  console.log("Server started successfully");
});
