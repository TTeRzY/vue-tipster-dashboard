<template>
   <div class="charts-holder">
       <div class="charts col-lg-8 ml-auto mr-auto">
           <h2>Bets Statistics</h2>
           <div class="row">
               <div class="col-lg-6 chart-content">
                   <app-bar-chart></app-bar-chart>
               </div>
               <div class="col-lg-6 chart-content">
                   <app-pie-chart></app-pie-chart>
               </div>

               <div class="col-lg-12">
                   <app-profit-chart></app-profit-chart>
               </div>
           </div>
       </div>
   </div>
</template>

<script>
    import PieChart from './PieChart.vue'
    import BarChart from './BarChart.vue'
    import ProfitChart from './ProfitChart.vue'
  export default {
    name: "home",
    components: {
      appPieChart: PieChart,
      appBarChart: BarChart,
      appProfitChart: ProfitChart
    }
  }
</script>

<style scoped>
    .chart-card{
        width: 100%;
        background: #fff;
        padding: 40px;
        margin-bottom: 27px;
    }

    .charts-holder{
        background: #F4F7FA;
        width: 100%;
        display: block;
    }

    .charts-holder h2{
        color: #212529;
        font-size: 28px;
        padding: 30px 0;
    }
</style>