<template>
  <div class="members">
    <v-row class="px-2">
      <span class="title grey--text">Members</span>
      <v-spacer></v-spacer>
      <AddMember />
    </v-row>

    <v-container class="my-5">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="member in allMembers.data" :key="member.id">
          <v-card @dblclick="onDblClick(member)" flat class="text-center ma-3">
            <div>
              <v-avatar color="red accent-1" class="mt-4" size="50">
                <img src="/koroleva-circle-rmbg.png" alt="INF" />
              </v-avatar>
            </div>
            <v-card-text class="text-left">
              <div class="grey--text">{{member.first_name}}</div>
              <div class="grey--text">{{member.last_name}}</div>
              <div class="grey--text">{{member.phone}}</div>
              <div class="grey--text">{{member.birth_date}}</div>
              <div class="grey--text">{{member.record}}</div>
              <div class="grey--text">{{member.group_id}}</div>
            </v-card-text>
            <v-card-actions>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    text
                    color="grey"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Update</span>
              </v-tooltip>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    @click="deleteMember(member.id)"
                    text
                    color="grey"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span class="red--text">Delete</span>
              </v-tooltip>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-pagination color="red accent-1" v-model="page" :length="6"></v-pagination>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AddMember from "../components/AddMember";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AddMember,
  },
  data: () => ({
    page: 1,
  }),
  methods: {
    ...mapActions(["fetchMembers", "updateMember", "deleteMember"]),
    onDblClick(member) {
      const updMember = {
        id: member.id,
        first_name: member.first_name,
        last_name: member.last_name,
        phone: member.phone,
        record: "Foka",
        birth_date: member.birth_date,
        group_id: member.group_id,
      };

      this.updateMember(updMember);
    },
  },
  computed: mapGetters(["allMembers"]),
  created() {
    this.fetchMembers(this.page);
  },
  watch: {
    page: function () {
      this.fetchMembers(this.page);
    },
  },
};
</script>

<style>
</style>