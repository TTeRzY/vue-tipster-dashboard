<template>
    <div class="chart-card">
        <h2 class="text-center">ODDS/STAKE AVERAGE</h2>
        <hr>
        <canvas id="bar-chart"></canvas>
    </div>
</template>

<script>
  import Chart from '../../../../node_modules/chart.js/src/chart';
  import barChart from '../../../bar-chart-data';
  export default {
    name: "bar-chart",
    data() {
      return {
        barChart: barChart
      }
    },
    methods: {
      createChart(chartId, chartData) {
        const ctx = document.getElementById(chartId);
        const myChart = new Chart(ctx, {
          type: chartData.type,
          data: chartData.data,
          options: chartData.options,
        });
      }
    },
    mounted() {
      this.createChart('bar-chart', this.barChart);
    }
  }
</script>

<style scoped>

</style>