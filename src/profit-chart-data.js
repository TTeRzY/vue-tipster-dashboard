import axios from './axios-auth.js';
import globalAxios from 'axios';
import pattern from 'patternomaly';
import store from '../src/store';

let idToken = store.state.idToken;
let profitData = [];
let betDates = [];

const pieData=globalAxios.get('/bets.json'+ '?auth=' + idToken)
    .then(res => {
      let profitChartData = res.data;
      let profit = 0;
      for(let key in profitChartData){
        if(profitChartData[key].matchResult){
          profit += profitChartData[key].stakeResult;
          profitData.push(profit);
          betDates.push(profitChartData[key].pickedTime.split(' ').slice(1,4).join('/'));
        }
      }
    });

let colors = [
  '#4dbfa2',
];
let patterns = pattern.generate(colors);


export const profitChart = {
  type: 'line',
  data: {
    datasets: [{
      label: 'My profit',
      data: profitData,
      borderColor: colors,
      fill: false
    }],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: betDates,

  },
  options: {
    responsive: true,
    lineTension: 2,
  }
}

export default profitChart;