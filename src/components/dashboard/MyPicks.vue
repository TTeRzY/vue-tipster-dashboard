<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12 dashboard-counts section-padding">
                <div class="col-lg-9 ml-auto mr-auto">
                    <div class="row">
                        <!-- Count item widget-->
                        <div class="col-xl-2">
                            <div class="wrapper count-title d-flex">
                                <div class="name">
                                    <div class="count-number">{{countGames}}</div>
                                    <strong class="text-uppercase">PICKS</strong>
                                </div>
                            </div>
                        </div>
                        <!-- Count item widget-->
                        <div class="col-xl-2">
                            <div class="wrapper count-title d-flex">
                                <div class="name">
                                    <div class="count-number">{{ profit }}</div>
                                    <strong class="text-uppercase">PROFIT</strong>
                                </div>
                            </div>
                        </div>
                        <!-- Count item widget-->
                        <div class="col-xl-2">
                            <div class="wrapper count-title d-flex">
                                <div class="name">
                                    <div class="count-number">{{ avgYield }}%</div>
                                    <strong class="text-uppercase">YIELD</strong>
                                </div>
                            </div>
                        </div>
                        <!-- Count item widget-->
                        <div class="col-xl-2">
                            <div class="wrapper count-title d-flex">
                                <div class="name">
                                    <div class="count-number">{{ winRate }}%</div>
                                    <strong class="text-uppercase">WIN RATE</strong>
                                </div>
                            </div>
                        </div>
                        <!-- Count item widget-->
                        <div class="col-xl-2">
                            <div class="wrapper count-title d-flex">
                                <div class="name">
                                    <div class="count-number">{{ avgOdds }}</div>
                                    <strong class="text-uppercase">ODDS AVG.</strong>
                                </div>
                            </div>
                        </div>
                        <!-- Count item widget-->
                        <div class="col-xl-2">
                            <div class="wrapper count-title d-flex">
                                <div class="name">
                                    <div class="count-number">{{ avgStake }}</div>
                                    <strong class="text-uppercase">STAKE AVG.</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="picks-holder">
                    <div class="col-lg-9 ml-auto mr-auto">
                        <h2>My Picks</h2>
                    </div>
                </div>
                <div class="col-lg-8 ml-auto mr-auto">
                    <div class="row holder-picks">
                        <div class="col-lg-6" v-for="(key,index) in dataTips" v-if="dataTips.length > 0">
                            <div class="pick-list-content">
                                <ul class="feed-list">
                                    <li class="feed-pick">
                                        <div class="picks-body">
                                            <div class="title-name">
                                                <small class="pick-number">
                                                    <h3>#{{ index }}</h3>
                                                </small>
                                                <small class="bet-history-date">
                                                    {{ key.pickedTime }}
                                                </small>
                                            </div>
                                            <div class="feed-pick-title">
                                                <div class="col-xs-12 no-padding">
                                                    <h3>
                                                        <a target="_blank"
                                                           href="">
                                                            {{ key.pickedMatch }}
                                                        </a>
                                                    </h3>
                                                    <div class="pick-lines-labels-holder">
                                                        <div class="pick-line">
                                                            {{ key.pickLine }}
                                                            <span class="feed-odd">{{ key.pickOdds }}</span>
                                                        </div>

                                                        <div class="labels">
                                                            <span class="label label-default">{{ key.stake }} /10</span>

                                                            <a target="_blank" rel="nofollow"
                                                               class="label label-primary">Bet365</a>
                                                            <span :class="{'text-danger': key.stakeResult < 0, 'text-success': key.stakeResult > 0, 'text-info': key.stakeResult === 0}">{{key.stakeResult}}</span>
                                                            <span>
                                                                <span aria-hidden="true" class="text-danger" v-if="key.stakeResult < 0">&times;</span>
                                                                <span aria-hidden="true" class="text-success" v-if="key.stakeResult > 0">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" class="svg-inline--fa fa-check fa-w-16" role="img" aria-hidden="true" viewBox="0 0 512 512" data-icon="check" data-prefix="fas"><path fill="currentColor" d="M 173.898 439.404 l -166.4 -166.4 c -9.997 -9.997 -9.997 -26.206 0 -36.204 l 36.203 -36.204 c 9.997 -9.998 26.207 -9.998 36.204 0 L 192 312.69 L 432.095 72.596 c 9.997 -9.997 26.207 -9.997 36.204 0 l 36.203 36.204 c 9.997 9.997 9.997 26.206 0 36.204 l -294.4 294.401 c -9.998 9.997 -26.207 9.997 -36.204 -0.001 Z" /></svg>
                                                                </span>
                                                                {{key.matchResult}}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr>

                                                <div class="col-xs-12 feed-analysis">
                                                    <h6 class="text-muted">
                                                        Bet Analyse
                                                    </h6>
                                                    <div class="feed-analysis-inner">
                                                        <small>{{ key.analysis }}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
  import globalAxios from 'axios';

  export default {
    name: "home",
    data() {
      return {
        profit: 0,
        avgYield: 0,
        winRate: 0,
        avgOdds: 0,
        avgStake: 0,
        checkWin: '',
        countGames: 0,
        dataTips: []
      }
    },
    created() {
      globalAxios.get('/bets.json' + '?auth=' + this.$store.state.idToken)
        .then(res => {
          let getBets = res.data;
          let totalStake = 0;
          let totalOdds = 0;
          let winLoss = 0;
          for (let key in getBets) {
            if(getBets[key].matchResult){
              this.dataTips.push(getBets[key]);
              this.profit += getBets[key].stakeResult;
              totalStake += Math.round(getBets[key].stake);
              totalOdds += Math.round(getBets[key].pickOdds);
              if(getBets[key].winLossResult > 0){
                winLoss += getBets[key].winLossResult;
              }
              this.countGames++;
            }
          }
          this.avgStake = Math.round((totalStake  / this.countGames) * 100) / 100;
          this.avgOdds = Math.round((totalOdds / this.countGames) * 100) / 100;
          this.avgYield = Math.round(this.profit / (this.countGames * (totalStake / this.countGames)) * 100);
          this.winRate = Math.round((winLoss / this.countGames) * 100);
        });
    }
  }
</script>

<style scoped>
    .section-padding {
        padding: 3rem 0;
    }

    .d-flex {
        display: -ms-flexbox !important;
        display: flex !important;
    }

    .dashboard-counts {
        color: #fff;
        background: url("../../assets/tipster_img.jpg");
    }

    .dashboard-counts .count-title span {
        font-size: 0.8em;
        color: #aaa;
        display: inline-block;
    }

    .dashboard-counts strong {
        font-size: 0.8em;
    }

    .dashboard-counts .count-number {
        font-size: 1.8em;
    }

    .wrapper .name {
        width: 100%;
        display: flex;
        display: -ms-flex;
        justify-content: space-between;
        align-items: center;
    }

    .picks-holder {
        background: #4dbfa2;
        padding: 15px;
        border-bottom: 2px solid #4dbfa2;
    }

    .picks-holder h2 {
        font-weight: 700;
        margin: 0;
        color: #fff;
        text-transform: uppercase;
    }

    .pick-list-content {
        background: #ffffff;
    }

    .pick-list-content ul {
        padding: 0;
        list-style: none;
    }

    .feed-pick-title {
        padding-top: 12px;
    }

    .feed-pick-title h3 a {
        text-decoration: none;
        color: #333;
        transition: ease-in-out 0.5s;
    }

    .feed-pick-title h3 a:hover {
        color: rgba(0, 0, 0, 0.4);
        transition: ease-in-out 0.5s;
    }

    .pick-lines-labels-holder {
        display: flex;
        display: -ms-flex;
        align-items: center;
    }

    .pick-number h3 {
        color: #eb6379;
        font-weight: 700;
    }

    .feed-pick {
        padding: 20px;
        border: 1px solid #ddd;
    }

    .label-default {
        background: #999999;
    }

    .labels .label-primary {
        cursor: pointer;
        text-decoration: none;
        color: #ffffff;
        transition: ease-in-out 0.7s;
    }

    .text-green {
        color: #82daca !important;
    }

    .title-name {
        display: flex;
        display: -ms-flex;
        justify-content: space-between;
        border-bottom: 1px solid #ddd;
        padding-bottom: 7px;
    }

    .title-name small {
        color: #999999;
    }

    .label {
        display: inline;
        padding: .2em .6em .3em;
        font-size: 75%;
        font-weight: bold;
        line-height: 1;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: .25em;
    }

    .media-feed .feed-pick-title .labels .label {
        font-weight: 700;
        font-size: 12px;
        margin: -2px 6px 0 0;
    }

    .labels {
        padding-left: 7px;
    }

    .label-primary {
        background-color: #428bca;
    }

    .feed-analysis {
        margin: 15px 0;
    }

    @media only screen and (min-width: 1024px) {

        .dashboard-counts .count-title span {
            display: block;
        }

        .dashboard-counts strong {
            font-size: 1em;
        }

        .dashboard-counts .count-number {
            font-size: 3em;
        }

        .wrapper .name {
            display: block;
            text-align: center;
        }

        .text-danger{
            font-weight: 500;
        }

    }

    .text-success svg{
        max-height: 15px;
    }
    .holder-picks{
        padding-top: 40px;
    }

</style>