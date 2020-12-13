<template>
  <div>
    <v-card
      elevation="1"
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
      elevation="1"
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
          Pick search terms
        </v-stepper-step>

        <v-stepper-step step="2" complete>
          Pick an email and time
        </v-stepper-step>

        <v-stepper-step step="3" complete>
          Receive tenders of your choice
        </v-stepper-step>
      <!-- </v-stepper-header> -->
    </v-stepper>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
