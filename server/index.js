const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const port = 8080;

const mockDataAll = require('./mockData/mockDataAll.json');
const mockDataIndividual = require('./mockData/mock-individual.json');
const mockEvolution = require('./mockData/mockEvolution.json');

app.use(cors());

app.get('/allPokemons', (req, res) => {
  axios.get('https://pokeapi.co/api/v2/pokemon/')
    .then(result => {
      res.send(result.data);
    })
    .catch(err => res.send(err))
  // res.send(mockDataAll);
});

app.get('/pokemonAvatar/:id', (req, res) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`)
    .then(result => {
      const avatar = result.data.sprites.other.dream_world;
      res.send(avatar);
    })
    .catch(err => res.send(err))
  // res.send(mockDataIndividual.sprites.other.dream_world);
});

app.get('/pokemonDetails/:id', (req, res) => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`)
    .then(result => {
      const details = result.data;
      res.send(details);
    })
    .catch(err => res.send(err))
  // res.send(mockDataIndividual);
});

app.get('/pokemonSpecies/:id', async (req, res) => {
  console.log(`${req.params.id}   === ID`)
  axios.get(`https://pokeapi.co/api/v2/pokemon-species/${req.params.id}`)
    .then(result => {
      res.send(result.data.evolution_chain)
    })
    .catch(err => res.send(err))
  // res.send(mockEvolution);
});

app.get('/pokemonEvolution/:id', (req, res) => {
  axios.get(`https://pokeapi.co/api/v2/evolution-chain/${req.params.id}`)
    .then(result => res.send(result.data))
    .catch(err => res.send(err))
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})