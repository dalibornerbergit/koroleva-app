<template>
  <div class="groups" v-if="allGroups.data">
    <v-row class="px-2">
      <h1 class="title grey--text">Groups ({{ allGroups.data.length }})</h1>
      <v-spacer></v-spacer>
      <AddGroup />
    </v-row>

    <v-container v-if="allGroups.data" class="my-5">
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="group in allGroups.data"
          :key="group.id"
        >
          <v-card flat class="text-center ma-3">
            <div>
              <v-avatar color="koroleva" class="mt-4" size="50">
                <img src="/koroleva-circle-rmbg.png" alt="INF" />
              </v-avatar>
            </div>
            <v-card-text class="text-left">
              <div class="grey--text">
                Name:
                <b>{{ group.name }}</b>
              </div>
              <div class="grey--text">
                Info:
                <b>{{ group.record }}</b>
              </div>
              <v-row class="pa-3" justify="center">
                <v-btn @click="showMembers = !showMembers" small text
                  ><span class="grey--text" v-if="!showMembers">show more</span
                  ><span class="grey--text" v-else>show less</span></v-btn
                >
              </v-row>
              <div v-if="showMembers" class="grey--text">
                Members:
                <ol class="grey--text">
                  <li v-for="member in group.members" :key="member.id">
                    <b>{{ member.first_name }} {{ member.last_name }}</b>
                  </li>
                </ol>
              </div>
            </v-card-text>
            <v-card-actions>
              <AddGroup :groupProp="group" />
              <v-spacer></v-spacer>
              <DeleteDialog :groupId="group.id" type="group" />
              <!-- <v-btn @click="deleteGroup(group.id)" text color="grey">
                <v-icon>mdi-delete</v-icon>
              </v-btn> -->
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AddGroup from "../components/AddGroup";
import DeleteDialog from "../components/DeleteDialog";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AddGroup,
    DeleteDialog,
  },
  data: () => ({
    showMembers: false,
  }),
  methods: {
    ...mapActions(["fetchGroups"]),
  },
  computed: mapGetters(["allGroups"]),
  created() {
    this.fetchGroups();
  },
};
</script>