<template>
  <v-app id="app">
    <div v-if="user">
      <Navbar />
    </div>

    <v-main class="ma-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Api from "@/plugins/Api";
import { mapGetters } from "vuex";
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    Api.get("user", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        this.$store.dispatch("user", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
