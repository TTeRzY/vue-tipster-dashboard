import pattern from 'patternomaly';
let colors = [
  '#4dbfa2',
  '#428bca',
  '#eb6379',
];
let patterns = pattern.generate(colors);


export const pieChart = {
  type: 'pie',
  data: {
    datasets: [{
      data: [36, 2, 64],
      backgroundColor: colors
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ['win', 'void', 'lost']
  },
  options: {
    responsive: true,
    lineTension: 1,
  }
}

export default pieChart;