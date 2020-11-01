<template>
  <div class="members">
    <v-row class="px-2">
      <span class="title grey--text">Members</span>
      <v-spacer></v-spacer>
      <AddMember />
    </v-row>

    <v-container v-if="allMembers.data" class="my-5">
      <v-row class="mx-2">
        <v-col class="py-0" cols="12" sm="6" lg="3">
          <v-select
            prepend-icon="mdi-account-group-outline"
            :items="allGroups.data"
            v-model="group_id"
            label="Group"
            item-text="name"
            item-value="id"
          ></v-select>
        </v-col>
        <v-col class="py-0" cols="12" sm="6" lg="3">
          <v-text-field
            v-model="search"
            prepend-icon="mdi-account-search-outline"
            label="Search"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-btn color="koroleva white--text" depressed @click="freshMembers">
          <v-icon left>mdi-broom</v-icon>Remove filters</v-btn
        >
      </v-row>
      <v-row justify="center">
        <v-col>
          <v-pagination
            color="koroleva"
            v-model="page"
            :length="allMembers.meta.last_page"
          ></v-pagination>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="member in allMembers.data"
          :key="member.id + 'fswfs'"
        >
          <v-card flat class="text-center ma-3">
            <div>
              <v-avatar color="koroleva" class="mt-4" size="50">
                <img src="/koroleva-circle-rmbg.png" alt="INF" />
              </v-avatar>
            </div>
            <v-card-text class="text-left">
              <div class="grey--text">
                First Name:
                <b>{{ member.first_name }}</b>
              </div>
              <div class="grey--text">
                Last Name:
                <b>{{ member.last_name }}</b>
              </div>
              <div class="grey--text">
                Phone:
                <b>{{ member.phone }}</b>
              </div>
              <div class="grey--text">
                Birth Date:
                <b>{{ member.birth_date }}</b>
              </div>
              <div class="grey--text">
                Record:
                <b>{{ member.record }}</b>
              </div>
              <div class="grey--text">
                Group:
                <b>{{ member.group.name }}</b>
              </div>
            </v-card-text>
            <v-card-actions>
              <AddMember :memberProp="member" />
              <v-spacer></v-spacer>
              <DeleteDialog :memberId="member.id" type="member" />
              <!-- <v-btn @click="deleteMember(member.id)" text color="grey">
                <v-icon>mdi-delete</v-icon>
              </v-btn> -->
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col>
          <v-pagination
            color="koroleva"
            v-model="page"
            :length="allMembers.meta.last_page"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AddMember from "../components/AddMember";
import DeleteDialog from "../components/DeleteDialog";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AddMember,
    DeleteDialog,
  },
  data: () => ({
    page: 1,
    search: "",
    group_id: null,
  }),
  methods: {
    ...mapActions(["fetchMembers", "fetchGroups"]),
    freshMembers() {
      this.fetchMembers([this.page, "", null]);
      this.search = "";
      this.group_id = null;
    },
  },
  computed: mapGetters(["allMembers", "allGroups"]),
  created() {
    this.fetchMembers([this.page, this.search, this.group_id]);
    this.fetchGroups();
  },
  watch: {
    page: function () {
      this.fetchMembers([this.page, this.search, this.group_id]);
    },
    search: function () {
      this.fetchMembers([this.page, this.search, this.group_id]);
    },
    group_id: function () {
      this.fetchMembers([this.page, this.search, this.group_id]);
    },
  },
};
</script>