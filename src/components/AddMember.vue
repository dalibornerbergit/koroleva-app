<template>
  <v-dialog width="600px" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="memberProp"
        class="grey--text px-0"
        dark
        outlined
        text
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn
        v-else
        depressed
        color="koroleva"
        class="white--text"
        v-bind="attrs"
        v-on="on"
        ><v-icon left>mdi-plus</v-icon>Add new member</v-btn
      >
    </template>

    <v-card>
      <v-card-title>
        <h1 v-if="memberProp" class="title grey--text">Edit member</h1>
        <h1 v-else class="title grey--text">Add new member</h1>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" v-model="valid">
          <v-text-field
            label="First Name"
            v-model="member.first_name"
            :rules="inputRules"
            prepend-icon="mdi-account"
          ></v-text-field>
          <v-text-field
            label="Last Name"
            v-model="member.last_name"
            :rules="inputRules"
            prepend-icon="mdi-account"
          ></v-text-field>
          <v-text-field
            label="Phone"
            v-model="member.phone"
            :rules="inputRules"
            prepend-icon="mdi-phone"
          ></v-text-field>
          <v-textarea
            label="Info"
            v-model="member.record"
            :rules="inputRules"
            prepend-icon="mdi-pencil"
          ></v-textarea>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="member.birth_date"
                label="Birth date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="member.birth_date"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
          <v-select
            chips
            label="Group"
            color="koroleva"
            prepend-icon="mdi-account-group-outline"
            v-model="member.group_id"
            :items="allGroups.data"
            item-text="name"
            item-value="id"
          ></v-select>

          <v-card-actions class="px-0">
            <v-spacer></v-spacer>
            <v-btn
              v-if="memberProp"
              :disabled="!valid"
              :loading="loading"
              text
              color="koroleva"
              class="mx-0 mt-3"
              @click="submitEdit(member.id)"
              >Edit member</v-btn
            >
            <v-btn
              v-else
              :disabled="!valid"
              :loading="loading"
              text
              color="koroleva"
              class="mx-0 mt-3"
              @click="submit"
              >Add member</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
// import moment from "moment";
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    memberProp: Object,
  },
  data: () => ({
    member: {
      first_name: "",
      last_name: "",
      phone: "",
      record: "",
      birth_date: null,
      group_id: null,
    },
    menu2: false,
    loading: false,
    dialog: false,
    valid: false,
    inputRules: [(v) => !!v || "Required"],
  }),
  computed: {
    ...mapGetters(["allGroups"]),
  },
  created() {
    if (this.memberProp) this.member = this.memberProp;
  },
  methods: {
    ...mapActions(["addMember", "fetchGroups", "updateMember"]),
    submit() {
      this.addMember(this.member);
      this.dialog = false;
    },
    submitEdit(id) {
      const updMember = {
        id: id,
        first_name: this.member.first_name,
        last_name: this.member.last_name,
        phone: this.member.phone,
        record: this.member.record,
        birth_date: this.member.birth_date,
        group_id: this.member.group_id,
      };

      this.updateMember(updMember);
      this.dialog = false;
    },
  },
};
</script>