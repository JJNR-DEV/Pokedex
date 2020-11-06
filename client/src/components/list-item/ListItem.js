import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ListItem = ({ pokemon }) => {
    const [pokemonAvatar, setPokemonAvatar] = useState(null);
    const destructure = pokemon.url.split('/');
    const pokemonId = destructure[destructure.length -2];

    const fetchPokemonDetails = () => {
        fetch(`http://localhost:8080/pokemonAvatar/${pokemonId}`)
            .then(async res => {
                const avatar = await res.json();
                setPokemonAvatar(avatar.front_default);
            })
    }

    useEffect(() => fetchPokemonDetails(), []);
    
    return (
        <Link to={`/profile/${pokemonId}`}>
            <li>
                <div className="avatar-container">
                    { pokemonAvatar !== null && <img className="pokemon-avatar" src={pokemonAvatar} /> }
                    <strong>{ pokemon.name }</strong>
                </div>
                <i className="fa fa-angle-right"></i>
            </li>
        </Link>
    )
}

export default ListItem;