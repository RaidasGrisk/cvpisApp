<template>
  <div>
    <v-card elevation="1" outlined>
      <v-card-text>
        <p class="display-1 text--primary">
          Login Status:
           <label v-if="this.isSignIn">{{ this.$gAuth.GoogleAuth.currentUser.get().getId() }}</label>
           <label v-else>Not signed in</label><br>
        </p>
        <div class="text--primary">
        </div>
      </v-card-text>
    </v-card>

    <v-overlay :value="isSignIn && loading"><v-progress-circular indeterminate color="primary"></v-progress-circular></v-overlay>
    <br>

    <label v-if="this.userData && this.isSignIn">
    <v-data-table
        :headers="headers"
        :items="userData"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Subscriptions</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-row
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.email"
                          label="Email"
                        ></v-text-field>
                      </v-row>
                      <v-row
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.searchstring"
                          label="search string"
                        ></v-text-field>
                      </v-row>
                      <v-row
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-select
                          v-model="editedItem.tender_classes"
                          :items="dbConstants.tenderClasses"
                          label="tender types"
                          multiple
                        ></v-select>
                      </v-row>
                      <v-row
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-select
                          v-model="editedItem.tender_types"
                          :items="dbConstants.tenderTypes"
                          label="tender types"
                          multiple
                        ></v-select>
                      </v-row>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          You've no subscriptions, go ahead and add one
        </template>
      </v-data-table>
    </label>


    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      bottom
      right
      color="primary"
      outlined
    >
      {{snackbartext}}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
          color="primary"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </div>
</template>

<script>
import axios from 'axios'
import Constants from '../dbConstants'
const dbConstants = Constants.GetDBConstants()

export default {
  name: 'HelloWorld',
  data() {
    return {
      isSignIn: this.$gAuth.isAuthorized || false,
      userData: [],
      userId: null,
      loading: true,

      syncWithDbFlag: false,
      snackbar: false,
      snackbartext: 'updating',

      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'email', value: 'email' },
        { text: 'searchstring', value: 'searchstring' },
        { text: 'tender_classes', value: 'tender_classes' },
        { text: 'tender_types', value: 'tender_types' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        email: '',
        searchstring: '',
        tender_classes: dbConstants.tenderClasses,
        tender_types: dbConstants.tenderTypes,
      },
      defaultItem: {
        email: '',
        searchstring: '',
        tender_classes: dbConstants.tenderClasses,
        tender_types: dbConstants.tenderTypes,
      },
      dbConstants: dbConstants

    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    userData: {
      handler(val){
        // to break from inf loop with user and db response changes
        // adding a syncWithDbFlag var
        if (this.syncWithDbFlag) {
          console.log('updating db', val)
          this.syncUserData()
        } else {
          console.log('not updating the db')
          this.syncWithDbFlag = true
        }

      },
      deep: true
    }
  },

  methods: {
    // fetch user data
    getUserData() {
      var vm = this
      vm.loading = true
      axios.get(this.$backend + 'get_user_data', {
        params: {
          userId: this.$gAuth.GoogleAuth.currentUser.get().getId()
        }
      }).then(function (response) {
          console.log(response.data)
          vm.userData = response.data['data']
          vm.loading = false
      });
    },

    syncUserData () {
      var vm = this
      vm.snackbar = true
      // if this is a new user, the data will lack: id, rev, userId
      // lets add userId first, this must be done to link each row to a user
      // lets not add id and rev, as this will signfigy the fact that the
      // records that lack it, are new prev unseen db docs

      // add userID
      // loop over each doc in user
      for (var i = 0; i < vm.userData.length; ++i) {
        // if there is no userid
        if (!('userid' in vm.userData[i])) {
          console.log('adding user id')
          vm.userData[i]['userid'] = vm.userId
        }
      }

      // post data + userid - id, rev (if new entry)
      // manage the rest in the backend
      axios.post(this.$backend + 'sync_user_data', {
        userData: vm.userData,
        userid: vm.userId
      }).then(function (response) {
          console.log('backend resp', response.data)
          // refresh the data with new fresh copy of data from the db
          vm.userData = response.data
          vm.syncWithDbFlag = false
          vm.snackbartext = 'updated!'
      });
    },

    editItem (item) {
      this.editedIndex = this.userData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.userData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.userData.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.userData[this.editedIndex], this.editedItem)
      } else {
        this.userData.push(this.editedItem)
      }
      this.close()
    },

  },


  created() {
    let vm = this;
    let checkGauthLoad = setInterval(function () {
      vm.isInit = vm.$gAuth.isInit
      vm.isSignIn = vm.$gAuth.isAuthorized
      if (vm.isSignIn) {
        console.log('stopped')
        clearInterval(checkGauthLoad)
        vm.userId = vm.$gAuth.GoogleAuth.currentUser.get().getId()
        vm.getUserData()
      }
    }, 1000);

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
