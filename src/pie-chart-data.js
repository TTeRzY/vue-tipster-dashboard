import axios from './axios-auth.js';
import globalAxios from 'axios';
import pattern from 'patternomaly';
import store from '../src/store';

let idToken = (store.state.idToken);
let getResults = [];

  globalAxios.get('/bets.json' + '?auth=' + idToken)
    .then(res => {
      let pieData = res.data;
      let countGames = 0;
      let loses = 0;
      let wins = 0;
      let ties = 0;
      for (let key in pieData) {
        if (pieData[key].matchResult) {
          countGames++;
          if (pieData[key].winLossResult < 0) {
            loses++;
          }
          else if (pieData[key].winLossResult > 0) {
            wins++;
          }
          else {
            ties++;
          }
        }
      }
      getResults.push((wins / countGames) * 100);
      getResults.push((ties / countGames) * 100);
      getResults.push((loses / countGames) * 100);
    });

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
      data: getResults,
      backgroundColor: colors
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: ['win', 'void', 'lost']
  },
  options: {
    responsive: true,
    lineTension: 1,
  }
};

export default pieChart;