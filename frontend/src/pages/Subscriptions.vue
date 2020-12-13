<template>
  <div>
    <v-card
      elevation="1"
      outlined
    >
      <v-card-text>
        <p class="display-1 text--primary">
          Not logged in
        </p>
        <div class="text--primary">

        </div>
      </v-card-text>
    </v-card>
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
