<template>
  <!-- https://stackoverflow.com/questions/48035310/open-a-vuetify-dialog-from-a-component-template-in-vuejs?rq=1 -->
  <v-dialog v-model="show" max-width="500px">
    <!-- <v-container> -->
    <v-card>

    <v-card-text class="text-center">
      <p class="display-1 text--primary">
        <br>
        How does Search work?
      </p>
    </v-card-text>

    <v-container>
      <v-row>
      <v-col md="6">
      <v-card class="mx-auto">
        <v-card-text>
          <p class="display-1 text--primary">
            OR: ,
          </p>
          <p><b>Example:</b> water, sanitation, information, system</p>
          <div class="text--primary">
            <p>Your search will return records with either water OR sanitation OR information OR system</p>
          </div>
        </v-card-text>
      </v-card>
      </v-col>

      <v-col md="6">
      <v-card class="mx-auto">
        <v-card-text>
          <p class="display-1 text--primary">
            AND: ()
          </p>
          <p><b>Example:</b> (water, sanitation), information, system</p>
          <div class="text--primary">
            <p>Your search will return records with either water AND sanitation OR information OR system</p>
          </div>
        </v-card-text>
      </v-card>
      </v-col>
      </v-row>

      </v-container>

      <div class="text-center">
        <p>
        Filtering and searching is instant, just start typing!
      </p>
      </div>
      <br>

      <v-card-actions class="justify-center">
        <v-btn color="primary" @click.stop="show=false">Close</v-btn>
      </v-card-actions>
    </v-card>
    <!-- </v-container> -->
  </v-dialog>
</template>

<script>
export default {
  props: ['visible'],
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  }
}
</script>
