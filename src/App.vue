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
import axios from "axios";
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
    axios
      .get("http://127.0.0.1:8000/api/v1/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log("User: ", response);
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
