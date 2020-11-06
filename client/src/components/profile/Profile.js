import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import Stats from '../stats/Stats';
import Evolution from '../evolution/Evolution';

import Loading from '../../resources/pokeball-loading.gif';
import confusion from '../../resources/confusion.png';

const Profile = () => {
    const [pokemonInfo, setPokemonInfo] = useState(null);

    const url = window.location.pathname.split('/');
    const id = url[url.length - 1];

    const fetchPokemonDetails = () => {
        fetch(`http://localhost:8080/pokemonDetails/${id}`)
            .then(async res => {
                const content = await res.json();
                setPokemonInfo(content);
            })
    }

    useEffect(() => fetchPokemonDetails(), []);

    if (pokemonInfo === null) {
        return <img className="loading-screen" src={Loading} />
    }

    if (pokemonInfo.name === 'Error') {
        return (
            <div className="confusion-404">
                <h1>So I am confusion</h1>
                { pokemonInfo.message }
                <img src={ confusion } />
            </div>
        )
    }

    return (
        <div className="profile">
            <Link to="/">
                <i className="fa fa-chevron-circle-left"></i>
            </Link>
            <div className={`profile-pic type-${pokemonInfo.types[0].type.name}`}>
                <img src={ pokemonInfo.sprites.other.dream_world.front_default } />
            </div>
            <div className="poke-bio">
                <h2>{ pokemonInfo.name }</h2>

                { pokemonInfo.types.map((type, i) => <button key={i} className={`type-${type.type.name}`} >{ type.type.name }</button>) }
                { pokemonInfo.abilities.map((ability, i) => <p key={i}>{ ability.ability.name }</p>) }

                <div className="profile-links">
                    <Link to="stats">
                        <button>Stats</button>
                    </Link>

                    <Link to="evolution">
                        <button>Evolution</button>
                    </Link>
                </div>
            </div>
            
            <Route path="/profile/stats">
                <div className="stats-chart">
                    <Stats pokemonStats={pokemonInfo.stats} name={pokemonInfo.name} />
                </div>
            </Route>

            <Route path="/profile/evolution">
                <Evolution species={pokemonInfo.species} background={`type-${pokemonInfo.types[0].type.name}`} />
            </Route>
        </div>
    )
}

export default Profile;