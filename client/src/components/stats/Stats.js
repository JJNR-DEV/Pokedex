import React, { useEffect } from 'react';
import Chart from 'chart.js';
import { chartDetails } from './chartDetails';

const Stats = ({ pokemonStats, name }) => {
    const statsLabels = pokemonStats.map(pokemon => pokemon.stat.name);
    const baseStats = pokemonStats.map(pokemon => pokemon.base_stat);
    const chartRef = React.createRef();

    let myChart;

    useEffect(() => {
        myChart = new Chart(chartRef.current, chartDetails(statsLabels, baseStats, name));
    }, [])

    return (
        <canvas ref={chartRef} />
    )
}

export default Stats;