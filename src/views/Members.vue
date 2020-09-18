<template>
  <div class="members">
    <h1 class="title grey--text">Members</h1>

    <v-container class="my-5">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="(person, index) in team" :key="index">
          <v-card flat class="text-center ma-3">
            <div>
              <v-avatar color="red accent-1" class="mt-4" size="50">
                <img :src="person.avatar" alt="INF" />
              </v-avatar>
            </div>
            <v-card-text>
              <div class="subtitle-1">{{person.name}}</div>
              <div class="grey--text">{{person.role}}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="grey">
                <v-icon left small>mdi-message</v-icon>
                <span>message</span>
              </v-btn>
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
export default {
  data: () => ({
    page: 1,
    team: [
      { name: "The Net Ninja", role: "Web developer", avatar: "/koroleva-circle-rmbg.png" },
      { name: "Ryu", role: "Graphic designer", avatar: "/koroleva-circle-rmbg.png" },
      { name: "Chun Li", role: "Web developer", avatar: "/koroleva-circle-rmbg.png" },
      { name: "Gouken", role: "Social media maverick", avatar: "/koroleva-circle-rmbg.png" },
      { name: "Yoshi", role: "Sales guru", avatar: "/koroleva-circle-rmbg.png" },
      { name: "The Net Ninja", role: "Web developer", avatar: "/koroleva-circle-rmbg.png" },
      { name: "Ryu", role: "Graphic designer", avatar: "/koroleva-circle-rmbg.png" },
      { name: "Chun Li", role: "Web developer", avatar: "/koroleva-circle-rmbg.png" },
      { name: "Gouken", role: "Social media maverick", avatar: "/koroleva-circle-rmbg.png" },
      { name: "Yoshi", role: "Sales guru", avatar: "/koroleva-circle-rmbg.png" },
    ],
  }),
};
</script>

<style>
</style>