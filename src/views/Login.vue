<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10" md="6">
        <v-card outlined class="middle">
          <v-alert v-if="error" class="pa-2 ma-2" type="error">
            Wrong email or password
          </v-alert>
          <v-card-title class="title grey--text">Login</v-card-title>
          <v-row justify="center">
            <v-avatar size="100">
              <img
                :src="require('@/assets/koroleva-circle-rmbg.png')"
                alt="Image not found"
              />
            </v-avatar>
          </v-row>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                type="email"
                label="Email"
                v-model="email"
                :rules="inputRules"
              ></v-text-field>
              <v-text-field
                type="password"
                label="Password"
                v-model="password"
                :rules="inputRules"
              ></v-text-field>
              <v-card-actions class="px-0">
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!valid"
                  :loading="loading"
                  text
                  color="koroleva"
                  @click="login"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Api from "@/plugins/Api";
// import AuthServices from "../services/authServices";

export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      valid: false,
      error: false,
      inputRules: [(v) => !!v || "Required"],
    };
  },
  methods: {
    login() {
      // AuthServices.login(this.email, this.password);

      this.loading = true;

      Api.post("user/login", {
        email: this.email,
        password: this.password,
      })
        .then((response) => {
          this.loading = false;
          this.error = false;
          localStorage.setItem("accessToken", response.data.accessToken);
          this.$store.dispatch("user", response.data.user);
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
          this.error = true;
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.middle {
  margin-top: 25vh;
}
</style>