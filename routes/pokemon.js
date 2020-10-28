const express = require('express');
const router = express.Router();
const db = require("../models");
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(favorites => {
    res.render('faves.ejs', {favorites: favorites});
  })
  console.log(req.query.name)
  let deleteName = req.query.name
 db.pokemon.destroy({
    where: {
      name: deleteName
    }
}).then(numRowsDeleted=>{
    console.log(numRowsDeleted)
  // do something when done deleting
});
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  db.pokemon.create(req.body)
  .then(createdFave=> {
    res.redirect('/pokemon')
  })
});

//show route
router.get('/:idx', (req,res) =>{
  let pokeID = req.params.idx
  const pokemonIDUrl = `http://pokeapi.co/api/v2/pokemon/${pokeID}`;
  axios.get(pokemonIDUrl)
  .then( function(apiResponse) {
    let pokeData = apiResponse.data
    console.log(apiResponse.data)
    res.render('show', {pokeData: pokeData});
  })
});

//delete from favorites route


module.exports = router;

