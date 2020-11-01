<template>
  <v-dialog width="600px" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="trainingProp"
        class="grey--text px-0"
        dark
        outlined
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        v-else
        depressed
        color="koroleva"
        class="white--text"
        v-bind="attrs"
        v-on="on"
        ><v-icon left>mdi-plus</v-icon>Add new training</v-btn
      >
    </template>

    <v-card>
      <v-card-title v-if="trainingProp" class="title grey--text"
        >Edit training</v-card-title
      >
      <v-card-title v-else class="title grey--text"
        >Add new training</v-card-title
      >
      <v-card-text>
        <v-form class="px-3" v-model="valid">
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
                v-model="training.date"
                :rules="inputRules"
                label="Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="training.date"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
          <v-textarea
            label="Info"
            v-model="training.record"
            :rules="inputRules"
            prepend-icon="mdi-pencil"
          ></v-textarea>
          <v-select
            label="Group"
            prepend-icon="mdi-account-group-outline"
            v-model="training.group_id"
            :items="allGroups.data"
            item-text="name"
            item-value="id"
          ></v-select>

          <v-card-actions class="px-0">
            <v-spacer></v-spacer>
            <v-btn
              v-if="trainingProp"
              :disabled="!valid"
              :loading="loading"
              text
              color="info"
              class="mx-0 mt-3"
              @click="submitEdit(training.id)"
              >Edit training</v-btn
            >
            <v-btn
              v-else
              :disabled="!valid"
              :loading="loading"
              text
              color="info"
              class="mx-0 mt-3"
              @click="submit"
              >Add training</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    trainingProp: Object,
  },
  data: () => ({
    training: {
      date: "",
      record: "",
      group_id: null,
    },
    menu2: false,
    loading: false,
    dialog: false,
    valid: false,
    inputRules: [(v) => !!v || "Required"],
  }),
  computed: {
    ...mapGetters(["allGroups"]),
  },
  created() {
    if (this.trainingProp) this.training = this.trainingProp;
  },
  methods: {
    ...mapActions(["addTraining", "fetchGroups", "updateTraining"]),
    submit() {
      this.addTraining(this.training);
      this.dialog = false;
    },
    submitEdit(id) {
      const updTraining = {
        id: id,
        date: this.training.date,
        record: this.training.record,
        group_id: this.training.group_id,
      };

      this.updateTraining(updTraining);
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>