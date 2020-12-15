<template>
  <div>
    <v-card
      elevation="0"
      outlined
    >
      <v-card-text>
        <p class="display-1 text--primary">
          Search CVPP simply
        </p>
        <div class="text--primary">
          Cvpp is hard to use if you are trying to filter tenders. Here you can do the same but easier and faster.
        </div>
      </v-card-text>
    </v-card>

    <br>
    <v-card
      elevation="0"
      outlined
    >
      <v-card-text>
        <p class="display-1 text--primary">
          Subscribe
        </p>
        <div class="text--primary">
          Each day receive an email with new tenders filtered by the keywords of your choice.
        </div>
      </v-card-text>
    </v-card>

    <v-stepper class="mt-12" vertical>
      <!-- <v-stepper-header > -->
        <v-stepper-step step="1" complete>
          Filter tenders of your choise
        </v-stepper-step>

        <v-stepper-step step="2" complete>
          Pick an email and time
        </v-stepper-step>

        <v-stepper-step step="3" complete>
          Receive updates each day
        </v-stepper-step>
      <!-- </v-stepper-header> -->
    </v-stepper>

    <br>
    <v-card
      elevation="0"
      outlined
    >
      <v-card-text>
        <p class="display-1 text--primary">
          Explore the DB via API
        </p>
        <div class="text--primary">
          CouchDB, can explore / use as mongoDB
        </div>
      </v-card-text>
    </v-card>


    <p>isSignIn: {{ isSignIn }}</p>




  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

  data() {
    return {
      isSignIn: this.$gAuth.isAuthorized || false
    }
  },

  created() {
    let that = this;
    setInterval(function () {
      that.isSignIn = that.$gAuth.isAuthorized;
    }, 1000);

  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
