<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10" md="6">
        <v-card outlined class="middle">
          <v-card-title class="title grey--text">Login</v-card-title>
          <v-row justify="center">
            <v-avatar size="100">
              <img src="/koroleva-circle-rmbg.png" alt="Image not found" />
            </v-avatar>
          </v-row>
          <v-card-text>
            <v-form v-model="valid">
              <v-text-field type="email" label="Email" v-model="email" :rules="inputRules"></v-text-field>
              <v-text-field type="password" label="Password" v-model="password" :rules="inputRules"></v-text-field>
              <v-card-actions class="px-0">
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="!valid"
                  :loading="loading"
                  text
                  color="koroleva"
                  @click="login"
                >Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
// import AuthServices from "../services/authServices";

export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      valid: false,
      inputRules: [(v) => !!v || "Required"],
    };
  },
  methods: {
    login() {
      // AuthServices.login(this.email, this.password);

      this.loading = true;

      axios
        .post("http://127.0.0.1:8000/api/v1/user/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log("Login", response);
          this.loading = false;
          localStorage.setItem("accessToken", response.data.accessToken);
          this.$store.dispatch("user", response.data.user);
          this.$router.push({ name: "trainings" });
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