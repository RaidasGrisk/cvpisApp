<template>
  <div>
    <v-app-bar
      app
      dense
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>CvpisApp</v-toolbar-title>
      <v-spacer></v-spacer>

      <signIn/>

    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      dense
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            App
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
      >
        <!-- https://stackoverflow.com/questions/60531257/how-to-link-a-v-list-item-to-a-component-using-the-router -->
        <!-- https://stackoverflow.com/questions/36120996/get-all-routes-in-a-vue-router -->
      <!-- build on top of router.js items so that -->
      <!-- to change the menu only router.js have to be modified -->
        <v-list-item
          v-for="route in $router.options.routes"
          :key="route.name"
          link @click="$router.push({ path: route.path }).catch(err => {})"

        >
          <v-list-item-icon>
            <v-icon>{{ route.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ route.name }}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>
      </v-list>

      <!-- Bottom of drawer  -->
      <template v-slot:append>
        <v-list
          dense
        >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Light/dark mode</v-list-item-title>
            <v-switch @click="$vuetify.theme.dark=!$vuetify.theme.dark"></v-switch>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      </template>

    </v-navigation-drawer>
  </div>
</template>

<script>

import signIn from '@/components/signIn'

export default {
  name: 'navbar',
  components: {
    signIn
  },

  data () {
    return {
      drawer: true,
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
