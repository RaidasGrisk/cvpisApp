<template>
  <div>
    <v-row>
      <v-col md="4">

        <v-card elevation="0" outlined>
          <v-card-text>
            <p class="display-1 text--primary">
              Search tenders
            </p>
            <div class="text--primary">
              Cvpp is hard to use if you are trying to filter tenders. Here you can do the same but easier and faster.
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col md="4">
        <v-card elevation="0" outlined>
          <v-card-text>
            <p class="display-1 text--primary">
              Subscribe for daily update
            </p>
            <div class="text--primary">
              Each day receive an email with new tenders filtered by the keywords of your choice.
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col md="4">
        <v-card elevation="0" outlined>
          <v-card-text>
            <p class="display-1 text--primary">
              Explore the DB via API
            </p>
            <div class="text--primary">
              The DB used by the app is open. Explore official
              <a href="https://docs.couchdb.org/en/stable/api/index.html" target="_blank">docs</a>,
              or start by trying out the following links:
              <a :href="this.$pouchDb + 'tenders/_all_docs'" target="_blank">all tender doc ids</a>,
              <a :href="this.$pouchDb + 'tenders/2020-699991'" target="_blank">tender (by doc Id)</a>,
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

<br><br>

<br><br>

    <!-- <v-container fluid style="margin: 0rem; padding: 0rem; width: 100%; height: 100%;"> -->
    <v-row>
      <v-col md="4">
        <lineChart v-if="data1 && labels1" :data="data1" :labels="labels1" text="Tender #"/>
      </v-col>

      <v-col md="4">
        <!-- :yAxisMax="500000000" -->
        <lineChart v-if="data2 && labels2" :data="data2" :labels="labels2" text="Sutartys €"/>
      </v-col>

      <v-col md="4">
        <lineChart v-if="data3 && labels3" :data="data3" :labels="labels3" text="Sutartys #"/>
      </v-col>
    </v-row>
  <!-- </v-container> -->



  </div>
</template>

<script>

import PouchDB from 'pouchdb';
import lineChart from "@/components/lineChart.vue"

export default {

  components: {
    lineChart
  },

  data() {
    return {
      labels1: false,
      data1: false,

      labels2: false,
      data2: false,

      labels3: false,
      data3: false,
    }
  },

  mounted() {

    var vm = this

    // get data
    var db1 = new PouchDB(this.$pouchDb + 'tenders');
    db1.query('doc_count_by_init_date', { group: true, reduce: true
    }).then(function (result) {
      var labels1 = []
      var data1 = []
      result['rows'].forEach(function (item) {
          labels1.push(item.key)
          data1.push(item.value)
      });
      vm.labels1 = labels1.slice(-30)
      vm.data1 = data1.slice(-30)
    }).catch(function (err) {
      console.log(err)
    });

    // get data
    var db2 = new PouchDB(this.$pouchDb + 'sutartys');
    db2.query('doc_sum_by_init_date', { group: true, reduce: true
    }).then(function (result) {
      var labels2 = []
      var data2 = []
      result['rows'].forEach(function (item) {
          labels2.push(item.key)
          data2.push(item.value)
      });
      vm.labels2 = labels2.slice(-30)
      vm.data2 = data2.slice(-30)
    }).catch(function (err) {
      console.log(err)
    });

    // get data
    var db3 = new PouchDB(this.$pouchDb + 'sutartys');
    db3.query('doc_count_by_init_date', { group: true, reduce: true
    }).then(function (result) {
      var labels3 = []
      var data3 = []
      result['rows'].forEach(function (item) {
          labels3.push(item.key)
          data3.push(item.value)
      });
      vm.labels3 = labels3.slice(-30)
      vm.data3 = data3.slice(-30)
    }).catch(function (err) {
      console.log(err)
    });

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
