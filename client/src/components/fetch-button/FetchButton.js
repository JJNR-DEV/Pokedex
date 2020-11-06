import React from 'react';

const FetchButton = ({ next, currentPokemons, setPokemonsArr }) => {
    const fetchNext = () => {
        fetch(next)
            .then(async res => {
                const newList = await res.json();
                setPokemonsArr([...currentPokemons, ...newList.results])
            })
            .catch(err => `Could not get more Pokemons: ${err}`)
    }

    return (
        <div className="fetch-btn-container">
            <button onClick={fetchNext}>Display More</button>
        </div>
    )
}

export default FetchButton;