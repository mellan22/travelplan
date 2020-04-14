<template>
  <v-card class="mx-auto" max-width="800">
    <v-img
      class="white--text align-end"
      height="200px"
      src="../assets/stockholm.jpg"
    >
      <v-card-title>stockholm</v-card-title>
    </v-img>

    <v-card-subtitle class="title">1/4/2030-20/4/2030</v-card-subtitle>

    <v-card-text class="text--primary">
      <v-list class="transparent">
        <v-list-item v-for="member in members" :key="member.name">
          <v-list-item-title>{{ member.name }}</v-list-item-title>

          <v-list-item-icon>
            <v-icon>{{ member.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-subtitle class="text-right">
            {{ member.phone }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="orange" text>
        detail
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      members: [
        { name: "Linda", icon: "mdi-bus-multiple", phone: "XX-XXX-XXXX" },
        { name: "Michael", icon: "mdi-home-circle", phone: "XX-XXX-XXXX" },
        { name: "Maria", icon: "mdi-walk", phone: "XX-XXX-XXXX" }
      ],
      nav_lists: [
        { name: "goal", icon: "mdi-bullseye-arrow" },
        {
          name: "members",
          icon: "mdi-account-multiple-check",
          lists: [
            { name: "names", link: "/names" },
            { name: "details", link: "/details" },
            ""
          ]
        },
        { name: "edit travelplan", icon: "mdi-cogs" },
        { name: "change theme", icon: "mdi-palette" }
      ]
    };
  }
};
</script>
