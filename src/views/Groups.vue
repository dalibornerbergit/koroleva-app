<template>
  <div class="groups">
    <v-row class="px-2">
      <h1 class="title grey--text">Groups</h1>
      <v-spacer></v-spacer>
      <AddGroup />
    </v-row>

    <v-container v-if="allGroups.data" class="my-5">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="group in allGroups.data" :key="group.id">
          <v-card flat class="text-center ma-3">
            <div>
              <v-avatar color="koroleva" class="mt-4" size="50">
                <img src="/koroleva-circle-rmbg.png" alt="INF" />
              </v-avatar>
            </div>
            <v-card-text class="text-left">
              <div class="grey--text">
                Name:
                <b>{{group.name}}</b>
              </div>
              <div class="grey--text">
                Last Name:
                <b>{{group.record}}</b>
              </div>
              <div class="grey--text">
                Members:
                <b>Članovi</b>
              </div>
            </v-card-text>
            <v-card-actions>
              <AddGroup :groupProp="group" />
              <v-spacer></v-spacer>
              <v-btn @click="deleteGroup(group.id)" text color="grey">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AddGroup from "../components/AddGroup";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AddGroup,
  },
  data: () => ({}),
  methods: {
    ...mapActions(["fetchGroups", "deleteGroup"]),
  },
  computed: mapGetters(["allGroups"]),
  created() {
    this.fetchGroups();
  },
};
</script>