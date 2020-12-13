<template>
  <div>

    <v-card elevation="0" outlined>
      <v-card-text>
        <v-text-field
          v-model="searchString"
          label="Search string"
        ></v-text-field>
        <v-select
          v-model="tender_type"
          :items="tender_types"
          label=""
          multiple
          chips
          hint=""
          persistent-hint
        ></v-select>
        <v-select
          v-model="tender_class"
          :items="tender_classes"
          label=""
          multiple
          chips
          hint=""
          persistent-hint
        ></v-select>
      </v-card-text>
    </v-card>

    <br><br>

    <v-data-table
      :headers="headers"
      :items="passData()"
      class="elevation-1"
      :footer-props="{'items-per-page-options':[15, 30, 50, 100]}"
      dense
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

import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-find').default)

export default {
  data () {
    return {

      tender_type: dbConstants.tenderTypes,
      tender_types: dbConstants.tenderTypes,
      tender_class: dbConstants.tenderClasses,
      tender_classes: dbConstants.tenderClasses,
      data: [],
      isDataLoaded: true,
      searchString: ''
    }
  },
  computed: {

    headers () {
      return [
        { text: 'Tender', value: 'name'},
        { text: 'Buyer', value: 'buyer'},
        { text: 'Init_date', value: 'init_date'},
        { text: 'Deadline', value: 'deadline'}
      ]
    },

  },
  methods: {

    // a function to query the db and
    getData(table_name, index_field, selector, fields) {

      var db = new PouchDB('http://localhost:5984/' + table_name);
      var vm = this

      db.createIndex({
        index:{
          fields:[index_field]
        }
      })

      db.find({
        selector: selector,
        fields: fields,
        limit: 999999
      }).then(function (result) {
        vm.data = result['docs']
        vm.isDataLoaded = false
      }).catch(function (err) {
        console.log(err)
      })
    },

    // filter data according to current selections

    filteredTenders() {

      // what are the issues?
      // first we make a regex string then create a regex object out of that
      // not sure if this is a problem, but does not seem to be effective
      // second regex errors with unfinished input strings

      // regex string
      var regexString = shared.getRegexFromSearchString(this.searchString.toLowerCase())

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
      // console.log('final regex search', regexString)

      // this is the final function that returns out dataset
      var vm = this
      return this.data.filter(function(tender) {
        if (
          regexString.test(tender.name.toLowerCase()) &&
          vm.tender_types.includes(tender.tender_type) &&
          vm.tender_class.includes(tender.tender_class)) {
          return true
        } else {
          return false
        }
      })
    },

    passData() {
      if (this.data.length > 3) {
        return this.filteredTenders()
      } else {
        return this.data
      }
    }

  },

  mounted() {

    // get latest data on load
    var d = new Date();
    d.setMonth(d.getMonth() - 2);
    console.log(d)

    this.getData(
      'tenders',
      'init_date',
      {init_date: {$gt: d}},
      ['name', 'buyer', 'init_date', 'deadline', 'tender_type', 'tender_class', 'url']
    )
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
