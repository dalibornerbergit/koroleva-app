<template>
  <div class="memberTrainings">
    <v-row class="px-2">
      <span class="title grey--text">Member trainings</span>
      <v-spacer></v-spacer>
      <v-btn depressed color="koroleva" class="white--text" @click="goBack()"
        ><v-icon left>mdi-arrow-left</v-icon>Back</v-btn
      >
    </v-row>

    <v-container v-if="trainings" class="my-5">
      <v-row justify="center">
        <v-card v-if="member.group" class="ma-6" flat>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Member</div>
              <v-list-item-title class="overline mb-1"
                >{{ member.first_name }}
                {{ member.last_name }}</v-list-item-title
              >
              <v-list-item-subtitle class="overline">{{
                member.group.name
              }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar size="80" color="koroleva">
              <img src="/koroleva-circle-rmbg.png" alt="INF"
            /></v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="training in trainings"
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
                <b>{{ moment(training.date).format("DD.MM.YYYY.") }}</b>
              </div>
              <div class="grey--text">
                Info:
                <b>{{ training.record }}</b>
              </div>
              <div class="grey--text">
                Group:
                <b>{{ training.group.name }}</b>
              </div>
              <!-- <v-row class="pa-3" justify="center">
                <v-btn @click="showMembers = !showMembers" small text
                  ><span class="grey--text" v-if="!showMembers">show more</span
                  ><span class="grey--text" v-else>show less</span></v-btn
                >
              </v-row>
              <div v-if="showMembers" class="grey--text">
                Members: <b>{{ training.members.length }}</b>
                <ol class="grey--text">
                  <li v-for="member in training.members" :key="member.id">
                    <b>{{ member.first_name }} {{ member.last_name }}</b>
                  </li>
                </ol>
              </div> -->
            </v-card-text>
            <v-card-actions>
              <!-- <AddTraining :trainingProp="training" />
              <v-spacer></v-spacer>
              <AddPresentMembers
                :page="page"
                :training_id="training.id"
                :trainingGroup="training.group.id"
                :presentMembers="training.members"
              /> -->
              <v-spacer></v-spacer>
              <!-- <DeleteDialog :trainingId="training.id" type="training" /> -->
              <!-- <v-btn @click="deleteTraining(training.id)" text color="grey">
                <v-icon>mdi-delete</v-icon>
              </v-btn> -->
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <!-- <v-row justify="center">
        <v-col>
          <v-pagination
            color="koroleva"
            v-model="page"
            :length="allMembers.meta.last_page"
          ></v-pagination>
        </v-col>
      </v-row> -->
    </v-container>
  </div>
</template>

<script>
import Api from "@/plugins/Api";

export default {
  data: () => ({
    member: {},
    trainings: [],
  }),
  created() {
    Api.get("/members/" + this.$route.params.id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        console.log("Member: ", response);
        this.member = response.data.data;
        this.trainings = response.data.data.trainings;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>