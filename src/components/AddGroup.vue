<template>
  <v-dialog width="600px" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-if="groupProp" class="grey--text px-0" dark outlined text v-bind="attrs" v-on="on">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        v-else
        depressed
        color="koroleva"
        class="white--text"
        v-bind="attrs"
        v-on="on"
      ><v-icon left>mdi-plus</v-icon>Add new group</v-btn>
    </template>

    <v-card>
      <v-card-title v-if="groupProp" class="title grey--text">Edit group</v-card-title>
      <v-card-title v-else class="title grey--text">Add new group</v-card-title>
      <v-card-text>
        <v-form class="px-3" v-model="valid">
          <v-text-field
            label="Name"
            v-model="group.name"
            :rules="inputRules"
            prepend-icon="mdi-name"
          ></v-text-field>
          <v-textarea
            label="Info"
            v-model="group.record"
            :rules="inputRules"
            prepend-icon="mdi-pencil"
          ></v-textarea>
          <v-card-actions class="px-0">
            <v-spacer></v-spacer>
            <v-btn
              v-if="groupProp"
              :disabled="!valid"
              :loading="loading"
              text
              color="koroleva"
              class="mx-0 mt-3"
              @click="submitEdit(group.id)"
            >Edit member</v-btn>
            <v-btn
              v-else
              :disabled="!valid"
              :loading="loading"
              text
              color="koroleva"
              class="mx-0 mt-3"
              @click="submit"
            >Add group</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    groupProp: Object,
  },
  data: () => ({
    group: {
      name: "",
      record: "",
    },
    loading: false,
    dialog: false,
    inputRules: [(v) => !!v || "Required"],
    valid: false,
  }),
  created() {
    if (this.groupProp) this.group = this.groupProp;
  },
  methods: {
    ...mapActions(["addGroup", "updateGroup"]),
    submit() {
      this.addGroup(this.group);
      this.dialog = false;
    },
    submitEdit(id) {
      const updGroup = {
        id: id,
        name: this.group.name,
        record: this.group.record,
      };

      this.updateGroup(updGroup);
      this.dialog = false;
    },
  },
};
</script>