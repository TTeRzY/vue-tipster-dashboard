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
                                    <div class="count-number">4</div>
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
                                    <div class="count-number">{{ avgYield  }}%</div>
                                    <strong class="text-uppercase">YIELD</strong>
                                </div>
                            </div>
                        </div>
                        <!-- Count item widget-->
                        <div class="col-xl-2">
                            <div class="wrapper count-title d-flex">
                                <div class="name">
                                    <div class="count-number">{{ resultLine }}%</div>
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
                <div class="col-lg-8 ml-auto mr-auto" >
                    <div class="row" >
                        <div class="col-lg-6"  v-for="(key,index) in dataTips">
                            <div class="pick-list-content">
                                <ul class="feed-list">
                                    <li class="feed-pick">
                                        <div class="picks-body">
                                            <div class="title-name">
                                                <small class="pick-number">
                                                    <h3>#{{index}}</h3>
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
                                                            <span class="label label-default">{{ key.stake }}/10</span>

                                                            <a target="_blank" rel="nofollow"
                                                               class="label label-primary">Bet365</a>
                                                            <span title="" class="enable-tooltip"
                                                                  >{{ key.pickResult }}</span>
                                                            <span> &nbsp;{{ key.matchResult }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="sport-line">
                                            <span title="" class="margin-right-5 sport-icon football"
                                                  data-original-title="Football"></span>
                                                        <small class="text-muted">
                                                            <span class="hidden-xs">Football /</span>Champions L /
                                                            <span class="hidden-xs">Kick off:</span>{{ picksDateTime }}
                                                        </small>
                                                    </div>


                                                </div>


                                                <div class="col-xs-12 _text-more hidden feed-analysis">
                                                    <div id="feed_pick_analysis_19172297" contenteditable="false">
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
  export default {
    name: "home",
    data() {
      return {
        profit: 0,
        avgYield: '',
        winRate: '',
        avgOdds: 0,
        avgStake: 0,
        checkWin: '',
        dataTips: {
          1: {
            pickedTime: "Tue, Nov 21st, 2017, 21:39",
            pickedMatch: "Inter v Juventus",
            pickLine: "Juventus" + "@",
            pickOdds: 2.25,
            stake: 9,
            pickResult: -9,
            matchResult: "3-3",
            resultLine: -1,
          },
          2: {
            pickedTime: "Tue, Nov 21st, 2017, 21:39",
            pickedMatch: "Man Utd v Liverpool",
            pickLine: "Liverpool" + "@",
            pickOdds: 2.75,
            stake: 9,
            pickResult: -9,
            matchResult: "4-2",
            resultLine: -1
          },
          3: {
            pickedTime: "Tue, Nov 21st, 2017, 21:39",
            pickedMatch: "Sevilla v Valencia",
            pickLine: "Under 2.5" + "@",
            pickOdds: 2.75,
            stake: 9,
            pickResult: -9,
            matchResult: "3-1",
            resultLine: -1
          },
          4: {
            pickedTime: "Tue, Nov 21st, 2017, 21:39",
            pickedMatch: "Real Madrid v Bayern Munich",
            pickLine: "Over 2.5" + "@",
            pickOdds: 2.25,
            stake: 5,
            pickResult: 11.25,
            matchResult: "2-3",
            resultLine: 1
          },
          5: {
            pickedTime: "Tue, Nov 21st, 2017, 21:39",
            pickedMatch: "Barcelona v Atl. Madrid",
            pickLine: "Atl. Madrid" + "@",
            pickOdds: 3.75,
            stake: 7,
            pickResult: 26.25,
            matchResult: "0-1",
            resultLine: 1
          },
          6: {
            pickedTime: "Tue, Nov 21st, 2017, 21:39",
            pickedMatch: "Man City v Chelsea",
            pickLine: "Over 2.5; Yes (Result/Both Teams to Score)" + "@",
            pickOdds: 5.40,
            stake: 6,
            pickResult: -3,
            matchResult: "1-0",
            resultLine: -1
          }


        }
      }
    },
    methods: {
      dataGet() {
        let getProfit =0;
        for (let key in this.dataTips) {
          getProfit += this.dataTips[key].pickResult;
          console.log(this.dataTips[key].pickResult)
        }

        console.log(getProfit)
      }
    },
      created() {
        let countGames = 0;
        let averageOdds = 0;
        let averageStake = 0;
        let profit = 0;
        let winResultLine = 0;
        let lostResultLine = 0;
        for (let key in this.dataTips) {
          profit += this.dataTips[key].pickResult;
          averageOdds += this.dataTips[key].pickOdds;
          averageStake += this.dataTips[key].stake;
          if(this.dataTips[key].resultLine > 0){
            winResultLine += this.dataTips[key].resultLine;
          }
          else{
            lostResultLine += this.dataTips[key].resultLine;
          }
          countGames ++;
        }
        console.log(winResultLine)
        console.log(lostResultLine)
        this.profit = profit;
        this.avgOdds = Math.round((averageOdds / countGames) * 100 ) / 100;
        this.avgStake = averageStake / countGames;
        this.avgYield = Math.round(profit / (countGames * (averageStake / countGames)) * 100);
        this.resultLine = Math.round((winResultLine / countGames) * 100);
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

    .feed-pick-title h3 a:hover{
        color: rgba(0,0,0,0.4);
        transition: ease-in-out 0.5s;
    }

    .pick-lines-labels-holder {
        display: flex;
        display: -ms-flex;
        align-items: center;
    }

    .pick-number h3{
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

    .labels .label-primary{
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

    }

</style>