<template>
  <div id="app">
    <v-app>
      <navbar/>

      <!-- Sizes your content based upon application components -->
      <v-main>

        <!-- Provides the application the proper gutter -->
        <v-container fluid>

          <!-- If using vue-router -->
          <router-view/>

        </v-container>
      </v-main>

      <v-footer app>
        <!-- -->
      </v-footer>

    </v-app>
  </div>
</template>

<script>
import navbar from './components/navbar.vue'

export default {
  name: 'App',
  components: {
    navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
