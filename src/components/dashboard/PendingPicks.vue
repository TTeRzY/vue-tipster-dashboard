<template>
    <div class="col-lg-12 ml-auto-mr-auto">
        <div class="picks-holder">
            <div class="col-lg-9 ml-auto mr-auto">
                <h2>Pending Picks</h2>
            </div>
        </div>
        <div class="pending-picks col-lg-9 ml-auto mr-auto" v-for="getKeys in dataTips" v-if="dataTips.length > 0">
            <div class="row" v-for="(key,index) in getKeys" v-if="!key.stakeResult">
                <div class="bet-country col-lg-12">
                    <h4>England</h4>
                </div>
                <div class="match-content">
                    <div class="picked-match">
                        <h6>BET:</h6>
                        <p>{{ key.pickedMatch }}</p>
                    </div>
                    <div class="pick">
                        <h6>PICK:</h6>
                        {{ key.pickLine }}
                    </div>
                    <div class="odds">
                        <h6>ODD:</h6>
                        {{ key.pickOdds }}
                    </div>
                    <div class="stake">
                        <h6>STAKE:</h6>
                        {{ key.stake }} / 10
                    </div>
                    <div class="bookmaker">
                        <h6>BOOKMAKER:</h6>
                        Betfair
                    </div>
                    <div class="score">
                        <form>
                            <h6>Score:</h6>
                            <input
                                    name="score"
                                    id="score"
                                    type="text"
                                    v-model="key.matchResult"
                            >
                        </form>
                    </div>
                    <div class="result">
                        <button class="btn btn-loss" @click="lossBet(key, index)">LOSS</button>
                        <button class="btn btn-push" @click="pushBet(key, index)">PUSH</button>
                        <button class="btn btn-win" @click="winBet(key, index)">WIN</button>
                    </div>

                </div>
                <div class="analyses">
                    <h6>Analyse</h6>
                    {{key.analysis}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import globalAxios from 'axios';

  export default {
    name: "pending-picks",
    data() {
      return {
        dataTips: [],
        getBaseIndex: []
      }
    },
    created() {
      globalAxios.get('/bets.json' + '?auth=' + this.$store.state.idToken)
        .then(res => {
          this.dataTips.push(res.data);
        });
    },
    methods: {
      lossBet(key, index) {
        const betData = {
          key: index,
          matchData: {
            pickedMatch: key.pickedMatch,
            pickLine: key.pickLine,
            pickOdds: key.pickOdds,
            stake: key.stake,
            analysis: key.analysis,
            pickedTime: key.pickedTime,
            country: key.country,
            matchResult: key.matchResult,
            stakeResult: -key.stake,
            winLossResult: -1
          }
        };

        this.$store.dispatch('pendingBets', betData)
      },
      pushBet(key, index) {
        const betData = {
          key: index,
          matchData: {
            pickedMatch: key.pickedMatch,
            pickLine: key.pickLine,
            pickOdds: key.pickOdds,
            stake: key.stake,
            analysis: key.analysis,
            pickedTime: key.pickedTime,
            country: key.country,
            matchResult: key.matchResult,
            stakeResult: key.stake,
            winLossResult: 0
          }
        };

        this.$store.dispatch('pendingBets', betData);
      },
      winBet(key, index) {
        const betData = {
          key: index,
          matchData: {
            pickedMatch: key.pickedMatch,
            pickLine: key.pickLine,
            pickOdds: key.pickOdds,
            stake: key.stake,
            analysis: key.analysis,
            pickedTime: key.pickedTime,
            country: key.country,
            matchResult: key.matchResult,
            stakeResult: (key.stake * key.pickOdds) - key.stake,
            winLossResult: 1
          }
        };

        this.$store.dispatch('pendingBets', betData);
      }
    }
  }
</script>

<style scoped>
    .picks-holder {
        width: 100%;
        background: #4dbfa2;
        padding: 15px;
        border-bottom: 2px solid #4dbfa2;
        margin-bottom: 60px;
    }

    .pending-picks {
        border: 1px solid #ddd;
        margin-bottom: 27px;
    }

    .pending-picks h6 {
        color: #000;
        font-weight: 700;
    }

    .bet-country h4 {
        color: #ffffff;
    }

    .picks-holder h2 {
        color: #ffffff;
    }

    .bet-country {
        background: #4dbfa2;
        padding: 20px;
    }

    .match-content {
        width: 100%;
        display: -ms-flex;
        display: flex;
        justify-content: space-between;
        padding: 20px;
    }

    .btn-win {
        background: #82daca !important;
        color: #ffffff;
        font-weight: 600;
    }

    .btn-push {
        background: #6ad2eb !important;
        color: #ffffff;
        font-weight: 600;
    }

    .btn-loss {
        background: #eb6379 !important;
        color: #ffffff;
        font-weight: 600;
    }
    .analyses{
        width: 100%;
        border: 1px solid #ddd;
        padding: 20px;
        font-size: 14px;
        color: darkgrey;
        font-weight: 500;
    }
</style>