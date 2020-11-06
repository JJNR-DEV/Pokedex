import React, { useState, useEffect } from 'react'
import EvolutionStage from '../evolution-stage/EvolutionStage';

const Evolution = ({ species, background }) => {
    const [evolutionData, setEvolutionData] = useState(null);
    let evolutionPhase = [];
    
    const fetchEvolution = async () => {
        const destructure = species.url.split('/');
        const speciesID = destructure[destructure.length - 2];

        const evolutionUrl = await fetch(`http://localhost:8080/pokemonSpecies/${speciesID}`)
            .then(async res => {
                const result = await res.json();
                return result.url;
            })
            .catch(err => `Could not find evolution URL: ${err}`)

        const destructureEvolution = evolutionUrl.split('/');
        const evolutionID = destructureEvolution[destructureEvolution.length - 2];

        fetch(`http://localhost:8080/pokemonEvolution/${evolutionID}`)
            .then(async res => {
                const data = await res.json();
                setEvolutionData(data.chain)
            })
            .catch(err => `Could not find evolution chain: ${err}`)
    }

    
    useEffect(() => fetchEvolution(), []);
    
    if (evolutionData !== null) {
        evolutionPhase = [...evolutionPhase, evolutionData.species]
        evolutionData.evolves_to.map(evolve => {
            if (evolve.species) {
                evolutionPhase = [...evolutionPhase, evolve.species];
            }
            
            if (evolve.evolves_to.length > 0) {
                evolutionPhase = [...evolutionPhase, evolve.evolves_to[0].species];
            }
            
            return
        })
    }

    return (
        <div className={`evolution-chart ${background}`}>
            <h3>Evolution</h3>
            { evolutionPhase.map((phase, i) => {
                const urlSplit = phase.url.split('/');
                const pokemonID = urlSplit[urlSplit.length - 2];
                return <EvolutionStage key={i} pokemon={phase.name} pokemonId={pokemonID} />
            }) }
        </div>
    )
}

export default Evolution;