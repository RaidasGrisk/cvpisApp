<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: ['labels', 'data', 'yAxisMax', 'text'],

  mounted() {

    var vm = this

    // render chart
    this.renderChart(
      {
        labels: vm.labels,
        datasets: [
          {
            label: "Data 1",
            pointRadius: 0,
            pointBorderColor: "#ffffff",
            data: vm.data,
            backgroundColor: "transparent",
            borderColor: "rgba(1, 116, 188, 0.50)",
          }
        ],
        gridLines: {display: false, drawBorder: false},
      },
      {
        legend: false,
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: vm.text,
          fontSize: 18
        },
        scales : {
          xAxes : [{
            gridLines : {
              display : false
            },
            ticks: {
                autoSkip: true,
                maxTicksLimit: 10
            }
          }],
          yAxes : [{
            gridLines : {
              display : false,
            },
            ticks: {
              max: vm.yAxisMax
            }
          }]
        }
      }
    );


  }
};
</script>
