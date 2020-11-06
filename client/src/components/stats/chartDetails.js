export const chartDetails = (statsLabels, baseStats, name) => (
    {
        type: 'bar', 
        data: {
            labels: statsLabels,
            datasets: [{
                data: baseStats, 
                backgroundColor: [
                    '#ff9aa2',
                    '#c7ceea',
                    '#ffb7b2',
                    '#e2f0cb',
                    '#ffdac1',
                    '#b5ead7'
                ]
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 200,
                    }
                }]
            },
            title: {
                display: true,
                text: `STATS ${name.toUpperCase()}`
            }
        }
    }
)