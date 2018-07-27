import pattern from 'patternomaly';
let colors = [
  '#4dbfa2',
];
let patterns = pattern.generate(colors);

export const profitChart = {
  type: 'line',
  data: {
    datasets: [{
      data: [-9, -18, -27, -15.75, 10.5, 7.5],
      borderColor: colors,
      fill: false
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ['03/05/2017', '15/06/2017', '21/07/2017', '15/08/2017', '25/08/2017', '27/08/2017'],

  },
  options: {
    responsive: true,
    lineTension: 1,
  }
}

export default profitChart;