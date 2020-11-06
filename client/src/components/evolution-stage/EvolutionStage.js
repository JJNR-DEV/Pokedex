import React, { useState, useEffect } from 'react';

import pikachu from '../../resources/pikachu.gif';

const EvolutionStage = ({ pokemon, pokemonId }) => {
    const [pokemonStage, setPokemonStage] = useState(null);

    const fetchStage = () => {
        fetch(`http://localhost:8080/pokemonAvatar/${pokemonId}`)
            .then(async res => {
                const currentStagePokemon = await res.json();
                setPokemonStage(currentStagePokemon);
            })
    }

    useEffect(() => fetchStage(), []);

    if (pokemonStage === null ) {
        return <img className="loading-screen" src={pikachu} />
    }

    return (
        <div className="phase">
            <img src={pokemonStage.front_default} />
            <h4>{ pokemon }</h4>
            <i className="fa fa-arrow-down"></i>
        </div>
    )
}

export default EvolutionStage;