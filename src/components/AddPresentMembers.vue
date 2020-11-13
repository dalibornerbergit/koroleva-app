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
          chips
          color="koroleva"
          v-model="members"
          label="Members"
          prepend-icon="mdi-account"
          :items="allMembers.data"
          item-text="first_name"
          item-value="id"
        ></v-select>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="koroleva" text @click="submit">Add members</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import Api from "@/plugins/Api";
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    page: Number,
    training_id: Number,
    trainingGroup: Number,
    presentMembers: Array,
  },
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
    ...mapActions(["fetchMembers", "fetchTrainings"]),
    submit() {
      Api.post(`presence`, {
        training_id: this.training_id,
        members: this.members,
      }).then(() => {
        this.dialog = false;
        this.fetchTrainings([this.page, null]);
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