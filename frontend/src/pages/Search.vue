<template>
  <div>

    <howToSearch :visible="showHowToSearch" @close="showHowToSearch=false" />

    <v-row>
      <v-col cols="12" sm="8" md="10">

        <v-card elevation="0" outlined>
          <v-card-text>
            <p class="display-1 text--primary">
              Options
            </p>
            <v-text-field
              v-model="searchParams.searchString"
              label="Keywords"
            >
            <v-btn slot="append" small @click.stop="showHowToSearch=true">Explanation</v-btn>

            </v-text-field>

            <v-select
              v-model="searchParams.tender_type"
              :items="searchParams.tender_types"
              label=""
              multiple
              chips
              hint=""
              persistent-hint
            ></v-select>
            <v-select
              v-model="searchParams.tender_class"
              :items="searchParams.tender_classes"
              label=""
              multiple
              chips
              hint=""
              persistent-hint
            ></v-select>
          </v-card-text>
        </v-card>

      </v-col>
      <v-col md="2">
        <v-card elevation="0" height='100%' style="position: relative" outlined>
          <v-card-text>
            <p class="display-1 text--primary">
              Stats
            </p>
            <p>
            {{lastDate}} - {{firstDate}}
            </p>
            <p>
              Tenders in total # {{ filteredTenders.length }} <br>
              Tenders a day # ~{{ (filteredTenders.length / lastDateInt).toFixed(2) }}
            </p>
            <p>
              <v-text-field
                v-model="monthsToLookBack"
                label="Number of months to look back"
              ></v-text-field>
              <v-btn x-small @click="this.refreshData" :disabled="this.disableRefreshButton">refresh</v-btn>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <br><br>

    <v-data-table
      dense
      :headers="headers"
      :items="filteredTenders"
      class="elevation-1"
      :footer-props="{'items-per-page-options':[50, 100]}"
      sort-by="init_date"
      :sort-desc=true
      :loading="isDataLoaded"
    >
      <!-- The following is to make a url link
      https://stackoverflow.com/questions/61394522/add-hyperlink-in-v-data-table-vuetify -->
      <template #item.name="{ item }">
        <a target="_blank" :href="item.url">
          {{ item.name }}
        </a>
      </template>
    </v-data-table>

  </div>
</template>

<script>

import shared from '../shared'
import Constants from '../dbConstants'
const dbConstants = Constants.GetDBConstants()

import howToSearch from '@/components/howToSearch'

import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-find').default)

export default {

  name: 'Search',

  components: {
    howToSearch,
  },

  data () {
    return {

      searchParams: {
        searchString: '',
        tender_type: dbConstants.tenderTypes,
        tender_types: dbConstants.tenderTypes,
        tender_class: dbConstants.tenderClasses,
        tender_classes: dbConstants.tenderClasses,
      },

      monthsToLookBack: 6,
      disableRefreshButton: true,
      data: [], // the data returned by db
      isDataLoaded: true,

      lastDateInt: null,
      lastDate: null,
      firstDate: null,

      showHowToSearch: false,
    }
  },

  computed: {

    headers() {
      return [
        { text: 'Tender', value: 'name'},
        { text: 'Buyer', value: 'buyer'},
        { text: 'Init_date', value: 'init_date', width: 110},
        { text: 'Deadline', value: 'deadline', width: 110}
      ]
    },

    // filter data according to current selections
    // putting this inside watch, massivelly slows down the site
    filteredTenders() {

      var regexString = shared.getRegexFromSearchString(this.searchParams.searchString.toLowerCase())
      // test if expression is valid and remove invalid chars if so
      // invalid expression example: "(aa, bb"
      try {
        ''.match(regexString)
      } catch(e) {
        console.log('invalid removing chars')
        //eslint-disable-next-line
        regexString = regexString.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
      }
      regexString = new RegExp(regexString)

      var dataMask = this.data.map(tender =>
          (regexString.test(tender.name.toLowerCase()) &&
          this.searchParams.tender_type.includes(tender.tender_type) &&
          this.searchParams.tender_class.includes(tender.tender_class))
      )

      return this.data.filter((item, i) => dataMask[i]);
    },

  },

  methods: {

    // a function to query the db and
    getData(table_name, index_field, selector, fields) {

      // init and disable other functionalities until load is finished
      this.data = [];
      this.disableRefreshButton = true;
      this.isDataLoaded = true;

      var db = new PouchDB(this.$pouchDb + table_name);
      var vm = this

      db.createIndex({index:{fields:[index_field]}})
      db.find({
        selector: selector,
        fields: fields,
        limit: 999999
      }).then(function (result) {
        vm.data = result['docs']

        // save last data to get proper counts
        var minMaxDates = shared.getOldestDate(vm.data.map(value => value.init_date))
        const diffTime = Math.abs(new Date(minMaxDates[1]) - new Date(minMaxDates[0]));
        vm.lastDateInt = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        vm.lastDate = minMaxDates[1]
        vm.firstDate = minMaxDates[0]

        vm.isDataLoaded = false
        vm.disableRefreshButton = false
      }).catch(function (err) {
        console.log(err)
      })
    },

    refreshData() {
      // get latest data on load

      var d = new Date();
      d.setMonth(d.getMonth() - this.monthsToLookBack);
      console.log(d)

      this.getData(
        'tenders',
        'init_date',
        {init_date: {$gt: d}},
        ['name', 'buyer', 'init_date', 'deadline', 'tender_type', 'tender_class', 'url']
      )

    }

  },

  mounted() {

    // get latest data on load
    this.refreshData()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
