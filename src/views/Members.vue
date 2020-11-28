<template>
  <div>
    <div class="text-center mt-20" v-if="!allMembers.data">
      <v-progress-circular indeterminate color="koroleva"></v-progress-circular>
    </div>
    <div class="members" v-else>
      <div class="text-center">
        <v-snackbar
          top
          v-model="successSnackbar"
          color="koroleva"
          :timeout="timeout"
        >
          <b>Member added</b>
        </v-snackbar>
        <v-snackbar top v-model="errorSnackbar" color="grey" :timeout="timeout">
          <b>Error</b>
        </v-snackbar>
        <v-snackbar
          top
          v-model="deleteSnackbar"
          color="grey"
          :timeout="timeout"
        >
          <b>Member deleted</b>
        </v-snackbar>
      </div>

      <v-row class="px-2">
        <span class="title grey--text"
          >Members ({{ allMembers.meta.total }})</span
        >
        <v-spacer></v-spacer>
        <AddMember @success="memberAdded" @error="errorSnackbar = true" />
      </v-row>

      <v-container class="my-5">
        <v-row class="mx-2">
          <v-col class="py-0" cols="12" sm="6" lg="3">
            <v-select
              prepend-icon="mdi-account-group-outline"
              :items="allGroups.data"
              color="koroleva"
              v-model="group_id"
              label="Group"
              item-text="name"
              item-value="id"
            ></v-select>
          </v-col>
          <v-col class="py-0" cols="12" sm="6" lg="3">
            <v-text-field
              color="koroleva"
              v-model="search"
              prepend-icon="mdi-account-search-outline"
              label="Search"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-btn color="koroleva white--text" depressed @click="freshMembers">
            <v-icon left>mdi-broom</v-icon>Clear filters</v-btn
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
                  <v-icon dark> mdi-account </v-icon>
                  <!-- <img src="/koroleva-circle-rmbg.png" alt="INF" /> -->
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
                  <b v-if="member.birth_date">{{
                    moment(member.birth_date).format("DD.MM.YYYY.")
                  }}</b>
                  <b class="koroleva--text" v-else>Missing date</b>
                </div>
                <div class="grey--text">
                  Info:
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
                <v-btn text color="grey" @click="showTrainings(member.id)"
                  ><v-icon>mdi-human-female-dance</v-icon></v-btn
                >
                <v-spacer></v-spacer>
                <v-btn @click="openDeleteDialog(member.id)" text color="grey">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
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

        <!-- Dialogs -->

        <v-dialog max-width="290" v-model="deleteDialog">
          <DeleteDialog
            type="member"
            :memberId="deleteMemberId"
            @memberDeleted="removeMember"
            @close-dialog="deleteDialog = false"
          />
        </v-dialog>
      </v-container>
    </div>
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
    deleteMemberId: null,
    deleteDialog: false,
    page: 1,
    search: "",
    group_id: null,
    timeout: 3000,
    successSnackbar: false,
    deleteSnackbar: false,
    errorSnackbar: false,
  }),
  methods: {
    ...mapActions(["fetchMembers", "fetchGroups"]),
    freshMembers() {
      this.fetchMembers([this.page, this.search, null]);
      this.search = "";
      this.group_id = null;
    },
    showTrainings(id) {
      this.$router.push("/members/" + id);
    },
    memberAdded() {
      this.successSnackbar = true;
      this.allMembers.meta.total++;
    },
    removeMember() {
      this.deleteMemberId = null;
      this.deleteDialog = false;
      this.deleteSnackbar = true;
      this.allMembers.meta.total--;
    },
    openDeleteDialog(id) {
      this.deleteDialog = true;
      this.deleteMemberId = id;
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
      this.fetchMembers([1, this.search, this.group_id]);
    },
    group_id: function () {
      this.fetchMembers([1, this.search, this.group_id]);
    },
  },
};
</script>