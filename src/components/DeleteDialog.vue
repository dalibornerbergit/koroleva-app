<template>
  <v-card>
    <v-card-title class="headline"> Delete </v-card-title>
    <v-card-text>Are you sure ?</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="dark" text @click="$emit('close-dialog')"> Cancle </v-btn>
      <!-- Training -->
      <v-btn
        v-if="type === 'training'"
        color="red darken-1"
        text
        @click="removeTraining()"
      >
        Delete training
      </v-btn>
      <!-- Member -->
      <v-btn
        v-if="type === 'member'"
        color="red darken-1"
        text
        @click="removeMember()"
      >
        Delete member
      </v-btn>
      <!-- Group -->
      <v-btn
        v-if="type === 'group'"
        color="red darken-1"
        text
        @click="removeGroup()"
      >
        Delete group
      </v-btn>
    </v-card-actions>
  </v-card>
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
  data: () => ({}),
  methods: {
    ...mapActions(["deleteTraining", "deleteMember", "deleteGroup"]),
    removeTraining() {
      this.deleteTraining(this.trainingId).then(() => {
        this.$emit("trainingDeleted");
      });
    },
    removeMember() {
      this.deleteMember(this.memberId).then(() => {
        this.$emit("memberDeleted");
      });
    },
    removeGroup() {
      this.deleteGroup(this.groupId).then(() => {
        this.$emit("groupDeleted")
      })
    }
  },
};
</script>