<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn @click="dialog = true" text color="grey" v-bind="attrs" v-on="on">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline"> Delete </v-card-title>
      <v-card-text>Are you sure ?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="dark" text @click="dialog = false"> Cancle </v-btn>
        <!-- Training -->
        <v-btn
          v-if="type === 'training'"
          color="red darken-1"
          text
          @click="deleteTraining(trainingId)"
        >
          Delete training
        </v-btn>
        <!-- Member -->
        <v-btn
          v-if="type === 'member'"
          color="red darken-1"
          text
          @click="removeMember"
        >
          Delete member
        </v-btn>
        <!-- Group -->
        <v-btn
          v-if="type === 'group'"
          color="red darken-1"
          text
          @click="deleteGroup(groupId)"
        >
          Delete group
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    trainingId: Number,
    memberId: Number,
    groupId: Number,
    type: String,
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    ...mapActions(["deleteTraining", "deleteMember", "deleteGroup"]),
    removeMember() {
      this.deleteMember(this.memberId).then(() => {
        this.$emit("delete");
      });
    },
  },
};
</script>

<style>
</style>