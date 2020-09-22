  
<template>
  <nav>
    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" timeout="4000" top color="success">
      Added new member
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>

    <!-- Nav -->
    <v-app-bar app flat>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="grey--text"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span>ps</span>
        <span class="font-weight-bold">koroleva</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Dropdown menu -->
      <div class="d-none d-sm-flex">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="grey" text v-bind="attrs" v-on="on">
              <v-icon left>mdi-chevron-down</v-icon>menu
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(link, index) in links" :key="index" link :to="link.route">
              <v-list-item-title>
                <v-icon left>{{link.icon}}</v-icon>
                {{ link.text }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <span class="grey--text d-none d-sm-flex koroleva py-1 px-2 rounded">{{user.email}}</span>

      <!-- Logout -->
      <div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="logOut">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </template>
          <span class="red--text">Logout</span>
        </v-tooltip>
      </div>
    </v-app-bar>

    <!-- Sidebar -->
    <v-navigation-drawer app v-model="drawer" class="red accent-1">
      <v-row class="mt-5">
        <v-col class="d-flex justify-center">
          <v-avatar color="transparent" size="100">
            <img src="/koroleva-circle-rmbg.png" alt="Image not found" />
          </v-avatar>
        </v-col>
      </v-row>
      <v-row class="my-5" justify="center">
        <AddMember @projectAdded="snackbar = true" />
      </v-row>

      <!-- List of actions -->
      <v-list>
        <v-list-item v-for="link in links" :key="link.text" link :to="link.route">
          <v-list-item-icon>
            <v-icon class="white--text">{{link.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import AddMember from "./AddMember";

export default {
  components: {
    AddMember,
  },
  data: () => ({
    drawer: false,
    snackbar: false,
    links: [
      { icon: "mdi-shoe-ballet", text: "trainings", route: "/trainings" },
      { icon: "mdi-account", text: "members", route: "/members" },
      { icon: "mdi-account-group-outline", text: "groups", route: "/groups" },
    ],
  }),
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    logOut() {
      localStorage.removeItem("accessToken");
      this.$store.dispatch("user", null);
      window.location.href = "/login";
    },
  },
};
</script>