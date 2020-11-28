<template>
  <div>
    <div class="text-center mt-20" v-if="!allGroups.data">
      <v-progress-circular indeterminate color="koroleva"></v-progress-circular>
    </div>
    <div class="groups" v-else>
      <div class="text-center">
        <v-snackbar
          top
          v-model="successSnackbar"
          color="koroleva"
          :timeout="timeout"
        >
          <b>Group added</b>
        </v-snackbar>
        <v-snackbar
          top
          v-model="deleteSnackbar"
          color="grey"
          :timeout="timeout"
        >
          <b>Group deleted</b>
        </v-snackbar>
        <v-snackbar top v-model="errorSnackbar" color="grey" :timeout="timeout">
          <b>Error</b>
        </v-snackbar>
      </div>

      <v-row class="px-2">
        <h1 class="title grey--text">Groups ({{ allGroups.data.length }})</h1>
        <v-spacer></v-spacer>
        <AddGroup
          @success="successSnackbar = true"
          @error="errorSnackbar = true"
        />
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
                  <v-icon dark>
                    mdi-account-group-outline
                  </v-icon>
                  <!-- <img src="/koroleva-circle-rmbg.png" alt="INF" /> -->
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
                    ><span class="grey--text" v-if="!showMembers"
                      >show more</span
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
                <v-btn @click="openDeleteDialog(group.id)" text color="grey">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Dialogs -->
        <v-dialog max-width="290" v-model="deleteDialog">
          <DeleteDialog
            type="group"
            :groupId="deleteGroupId"
            @groupDeleted="removeGroup"
            @close-dialog="deleteDialog = false"
          />
        </v-dialog>
      </v-container>
    </div>
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
    deleteDialog: false,
    deleteGroupId: false,
    deleteSnackbar: false,
    showMembers: false,
    timeout: 3000,
    successSnackbar: false,
    errorSnackbar: false,
  }),
  methods: {
    ...mapActions(["fetchGroups"]),
    openDeleteDialog(id) {
      this.deleteDialog = true
      this.deleteGroupId = id;
    },
    removeGroup() {
      this.deleteGroupId = null;
      this.deleteDialog = false;
      this.deleteSnackbar = true;
    },
  },
  computed: mapGetters(["allGroups"]),
  created() {
    this.fetchGroups();
  },
};
</script>