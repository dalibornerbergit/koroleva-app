<template>
  <v-dialog width="600px" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark outlined text v-bind="attrs" v-on="on">Add new member</v-btn>
    </template>

    <v-card>
      <v-card-title>
        <h1 class="title grey--text">Add new member</h1>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" v-model="valid">
          <v-text-field
            label="Title"
            v-model="title"
            :rules="inputRules"
            prepend-icon="mdi-account"
          ></v-text-field>
          <v-textarea label="Info" v-model="content" :rules="inputRules" prepend-icon="mdi-pencil"></v-textarea>

          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="formatedDate"
                :rules="inputRules"
                label="Picker without buttons"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
          </v-menu>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              :loading="loading"
              text
              color="info"
              class="mx-0 mt-3"
              @click="submit"
            >Add member</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";

export default {
  data: () => ({
    title: "",
    content: "",
    date: null,
    menu2: false,
    loading: false,
    dialog: false,
    valid: false,
    inputRules: [(v) => !!v || "Required"],
  }),
  computed: {
    formatedDate() {
      return this.date ? moment(String(this.date)).format("DD.MM.YYYY") : "";
    },
  },
  methods: {
    submit() {
      console.log(this.title, this.content, this.date);

      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.dialog = false;
        this.$emit("projectAdded");
      }, 1500);
    },
  },
};
</script>

<style>
</style>