<template>
  <div class="home">
    <v-row class="px-2">
      <h1 class="title grey--text">Trainings</h1>
      <v-spacer></v-spacer>
      <AddTraining />
    </v-row>

    <v-container v-if="allTrainings.data" class="my-5">
      <v-row justify="center">
        <v-pagination
          color="koroleva"
          v-model="page"
          :length="allTrainings.meta.last_page"
        ></v-pagination>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="training in allTrainings.data"
          :key="training.id"
        >
          <v-card flat class="text-center ma-3">
            <div>
              <v-avatar color="koroleva" class="mt-4" size="50">
                <img src="/koroleva-circle-rmbg.png" alt="INF" />
              </v-avatar>
            </div>
            <v-card-text class="text-left">
              <div class="grey--text">
                Date:
                <b>{{ training.date }}</b>
              </div>
              <div class="grey--text">
                Info:
                <b>{{ training.record }}</b>
              </div>
              <div class="grey--text">
                Group:
                <b>{{ training.group.name }}</b>
              </div>
              <v-row class="pa-3" justify="center">
                <v-btn @click="showMembers = !showMembers" small text
                  ><span class="grey--text" v-if="!showMembers">show more</span
                  ><span class="grey--text" v-else>show less</span></v-btn
                >
              </v-row>
              <div v-if="showMembers" class="grey--text">
                Members: <b>{{ training.members.length }}</b>
                <ol class="grey--text">
                  <li v-for="member in training.members" :key="member.id">
                    <b>{{ member.first_name }}</b>
                  </li>
                </ol>
              </div>
            </v-card-text>
            <v-card-actions>
              <AddTraining :trainingProp="training" />
              <v-spacer></v-spacer>
              <AddPresentMembers
                :training_id="training.id"
                :trainingGroup="training.group.id"
                :presentMembers="training.members"
              />
              <v-spacer></v-spacer>
              <v-btn @click="deleteTraining(training.id)" text color="grey">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-pagination
          color="koroleva"
          v-model="page"
          :length="allTrainings.meta.last_page"
        ></v-pagination>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AddTraining from "../components/AddTraining";
import AddPresentMembers from "../components/AddPresentMembers";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AddTraining,
    AddPresentMembers,
  },
  data: () => ({
    page: 1,
    showMembers: false,
  }),
  methods: {
    ...mapActions([
      "fetchTrainings",
      "fetchGroups",
      "deleteTraining",
    ]),
  },
  computed: {
    ...mapGetters(["allTrainings", "allGroups"]),
  },
  created() {
    this.fetchTrainings(this.page);
    this.fetchGroups();
  },
  watch: {
    page: function () {
      this.fetchTrainings(this.page);
    },
  },
};
</script>