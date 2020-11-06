import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import { CSSTransition } from "react-transition-group";
import List from './components/list/List';
import Profile from './components/profile/Profile'

function App() {
  const fetchAllPokemons = () => {
    return fetch('http://localhost:8080/allPokemons')
      .then(res =>  res.json())
      .catch(err => `Something went wrong: ${err}`)
  }


  return (
    <BrowserRouter>
        <Route exact path="/">
            <div className="App">
              <h1 className="main-title">Pokédex</h1>
              <List fetchPokemons={fetchAllPokemons()} />
            </div>
        </Route>

        <Route path="/profile">
            <Profile />
        </Route>
    </BrowserRouter>
  );
}

export default App;
