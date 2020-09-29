<template>
  <v-dialog v-model="dialog" width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="grey--text px-0"
        dark
        outlined
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="title grey--text">
        Add present members
      </v-card-title>

      <v-card-text>
        <v-select
          counter
          multiple
          v-model="members"
          label="Members"
          prepend-icon="mdi-account"
          :items="allMembers.data"
          item-text="first_name"
          item-value="id"
        ></v-select>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="submit">Add members</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  props: { training_id: Number, trainingGroup: Number, presentMembers: Array },
  data() {
    return {
      dialog: false,
      members: [],
    };
  },
  computed: {
    ...mapGetters(["allMembers"]),
  },
  created() {
    this.members = this.presentMembers;
  },
  methods: {
    ...mapActions(["fetchMembers"]),
    async submit() {
      await axios
        .post(
          `http://127.0.0.1:8000/api/v1/presence?training_id=${this.training_id}&members=[${this.members}]`
        )
        .then((response) => {
          console.log(response);
          this.dialog = false;
        });
    },
  },
  watch: {
    dialog: function () {
      if (this.dialog) this.fetchMembers([1, "", this.trainingGroup]);
    },
  },
};
</script>

<style>
</style>