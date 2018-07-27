<template>
    <div class="chart-card">
        <h2 class="text-center">PROFIT CHART</h2>
        <hr>
        <canvas id="profit-chart"></canvas>
    </div>
</template>

<script>
  import Chart from '../../../../node_modules/chart.js/src/chart';
  import profitChart from '../../../profit-chart-data';
  export default {
    name: "profit-chart",
    data() {
      return {
        profitChart: profitChart
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
      this.createChart('profit-chart', this.profitChart);
    }
  }
</script>

<style scoped>
</style>