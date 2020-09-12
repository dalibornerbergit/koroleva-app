<template>
  <div class="members">
    <h1 class="title grey--text">Members</h1>

    <v-container class="my-5">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="person in team" :key="person.name">
          <v-card flat class="text-center ma-3">
            <div>
              <v-avatar class="mt-4" rounded size="100">
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
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    team: [
      { name: "The Net Ninja", role: "Web developer", avatar: "/avatar.png" },
      { name: "Ryu", role: "Graphic designer", avatar: "/avatar.png" },
      { name: "Chun Li", role: "Web developer", avatar: "/avatar.png" },
      { name: "Gouken", role: "Social media maverick", avatar: "/avatar.png" },
      { name: "Yoshi", role: "Sales guru", avatar: "/avatar.png" },
    ],
  }),
};
</script>

<style>
</style>