export const barChart = {
  type: 'bar',
  data: {
    labels: ['average'],
    datasets: [{
      label: 'odds-average',
      data: [3.19],
      backgroundColor: '#4dbfa2'
    }, {
      label: 'stake-average',
      data: [7.5],
      backgroundColor: '#009688'
    }]
  },
  options:  {
    responsive: true,
    lineTension: 1,
  }
};

export default barChart;