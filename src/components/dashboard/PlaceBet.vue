<template>
    <div class="col-lg-6 ml-auto mr-auto">
        <form>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-3">
                    <h1>Place Your Bet</h1>
                    <hr>
                    <div class="form-group">
                        <label for="match">Match</label>
                        <input
                                type="text"
                                id="match"
                                class="form-control"
                                :value="dataTips.pickedMatch"
                                @input="dataTips.pickedMatch = $event.target.value">
                    </div>

                        <div class="form-group">
                            <label for="line">Line</label>
                            <select
                                    id="line"
                                    class="form-control"
                                    v-model.lazy="dataTips.pickLine">
                                <option value="" selected="selected">Pick Line</option>
                                <option value="Home Win" selected="selected">Home Win</option>
                                <option value="Draw">Draw</option>
                                <option value="Away Win">Away Win</option>
                                <option value="Under 1.5">Under 1.5</option>
                                <option value="Under 2.5">Under 2.5</option>
                                <option value="Both Team to score">Both Team to score</option>
                            </select>
                        </div>
                    <div class="odds-stakes">
                        <div class="form-group">
                            <label for="age">Odds</label>
                            <input
                                    type="text"
                                    id="age"
                                    class="form-control"
                                    v-model="dataTips.pickOdds">
                        </div>
                        <div class="form-group">
                            <label for="stake">Stake</label>
                            <input
                                    type="text"
                                    id="stake"
                                    class="form-control"
                                    v-model="dataTips.stake">
                        </div>
                        <div class="form-group">
                            <label for="country">Country</label>
                            <input
                                    type="text"
                                    id="country"
                                    class="form-control"
                                    v-model="dataTips.country">
                        </div>
                    </div>

                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-3 form-group">
                    <label for="analysis">Analysis</label><br>
                    <!-- Interpolation between <textarea>{{ test }}</textarea> doesn't work!-->
                    <textarea
                            id="analysis"
                            rows="5"
                            class="form-control"
                            v-model="dataTips.analysis"></textarea>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-3">
                    <button
                            class="btn btn-primary"
                            @click.prevent="submitted">Submit!
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "place-bet",
    data () {
      return {
        dataTips: {
            pickedTime: "",
            pickedMatch: "",
            country:"",
            pickLine: "",
            pickOdds: null,
            stake: null,
            analysis: "",
            matchResult: []
        }
      }
    },
    methods: {
      submitted() {
        this.$store.dispatch('placebet', this.dataTips)
      }
    },
    created(){
      let d = new Date().toString();
      this.dataTips.pickedTime = d;
    }
  }
</script>

<style scoped>
    form .row{
        align-items: center;
        justify-content: center;
    }

    form .odds-stakes{
        justify-content: space-between;
        display: flex;
        display: -ms-flex;
    }
</style>