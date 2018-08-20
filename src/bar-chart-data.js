import axios from './axios-auth.js';
import globalAxios from 'axios';
import store from '../src/store';

let idToken = store.state.idToken;
let odds = [];
let stakes = [];

globalAxios.get('/bets.json'+ '?auth=' + idToken)
    .then(res => {
      let data = res.data;
      let getOdds = 0;
      let getStakes = 0;
      let games = 0;
      for(let key in data){
        if(data[key].matchResult){
          getOdds += Math.round((data[key].pickOdds) * 100) / 100;
          getStakes +=  Math.round((data[key].stake) * 100) / 100;
          games++;
        }
      }
      let averageOdds = Math.round((getOdds / games) * 100) / 100;
      let averageStakes = Math.round((getStakes / games) * 100) /100;
      odds.push(averageOdds);
      stakes.push(averageStakes);
    });

export const barChart = {
  type: 'bar',
  data: {
    labels: ['average'],
    datasets: [{
      label: 'odds-average',
      data: odds,
      backgroundColor: '#4dbfa2'
    }, {
      label: 'stake-average',
      data: stakes,
      backgroundColor: '#009688'
    }]
  },
  options:  {
    responsive: true,
    lineTension: 1,
  }
};

export default barChart;