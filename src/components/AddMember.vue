<template>
  <v-dialog width="600px" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="grey--text px-0" dark outlined text v-bind="attrs" v-on="on">Add new member</v-btn>
    </template>

    <v-card>
      <v-card-title>
        <h1 class="title grey--text">Add new member</h1>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" v-model="valid">
          <v-text-field
            label="First Name"
            v-model="member.first_name"
            :rules="inputRules"
            prepend-icon="mdi-account"
          ></v-text-field>
          <v-text-field
            label="Last Name"
            v-model="member.last_name"
            :rules="inputRules"
            prepend-icon="mdi-account"
          ></v-text-field>
          <v-text-field
            label="Phone"
            v-model="member.phone"
            :rules="inputRules"
            prepend-icon="mdi-phone"
          ></v-text-field>
          <v-textarea
            label="Info"
            v-model="member.record"
            :rules="inputRules"
            prepend-icon="mdi-pencil"
          ></v-textarea>
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
                v-model="member.birth_date"
                :rules="inputRules"
                label="Birth date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="member.birth_date" @input="menu2 = false"></v-date-picker>
          </v-menu>
          <v-select
            label="Group"
            prepend-icon="mdi-account-group-outline"
            v-model="member.group_id"
            :items="groups"
          ></v-select>

          <v-card-actions class="px-0">
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
import { mapActions } from "vuex";

export default {
  data: () => ({
    member: {
      first_name: "",
      last_name: "",
      phone: "",
      record: "",
      birth_date: null,
      group_id: null,
    },
    menu2: false,
    loading: false,
    dialog: false,
    valid: false,
    groups: [1, 2, 3, 4, 5, 6],
    inputRules: [(v) => !!v || "Required"],
  }),
  computed: {
    formatedDate() {
      return this.member.date
        ? moment(String(this.date)).format("DD.MM.YYYY")
        : "";
    },
  },
  methods: {
    ...mapActions(["addMember"]),
    submit() {
      this.addMember(this.member);
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>