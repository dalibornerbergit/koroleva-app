<template>
  <v-app id="app">
    <Navbar />

    <v-main class="ma-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
* {
  font-family: "Montserrat", sans-serif;
}
#app {
  background-color: #eee;
}
</style>
