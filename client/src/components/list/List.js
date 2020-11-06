import React, { useEffect, useState } from 'react';
import ListItem from '../list-item/ListItem';
import FetchButton from '../fetch-button/FetchButton';

import Loading from '../../resources/pokeball-loading.gif';

const List = ({ fetchPokemons }) => {
    const [nextList, setNextList] = useState(null);
    const [allPokemons, setAllPokemons] = useState([]);

    const getAllPokemons = async () => {
        const all = await fetchPokemons;
        setAllPokemons(all.results);
        setNextList(all.next);
    }

    useEffect(() => {
        getAllPokemons()
    }, []);

    return (
        <div>
            <ul className="pokemons-list">
                { allPokemons === undefined
                    ? <img className="loading-screen" src={Loading} />
                    : allPokemons.map((pokemon, i) => <ListItem key={i} pokemon={pokemon} />)
                }
            </ul>
            { nextList !== null &&  <FetchButton next={nextList} currentPokemons={allPokemons} setPokemonsArr={setAllPokemons} /> }
        </div>
    )
}

export default List;