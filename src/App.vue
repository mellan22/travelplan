<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" clipped>
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title grey--text text--darken-2">
              Navigation lists
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
          <v-list-group
            v-for="nav_list in nav_lists"
            :key="nav_list.name"
            :prepend-icon="nav_list.icon"
            no-action
            :append-icon="nav_list.lists ? undefined : ''"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="list in nav_list.lists"
              :key="list.name"
              :to="list.link"
            >
              <v-list-item-content>
                <v-list-item-title>{{ list.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar src="./assets/Kye Meh.jpg" hide-on-scroll dark app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>travelplan</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" outlined
            >add new plan
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-subheader>Get help</v-subheader>
          <v-list-item v-for="plantype in plantypes" :key="plantype.name">
            <v-list-item-icon>
              <v-icon>{{ plantype.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ plantype.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
    <v-footer dark app>
      Vuetify
    </v-footer>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      drawer: null,
      plantypes: [
        { name: "transport", icon: "mdi-bus-multiple" },
        { name: "hotel", icon: "mdi-home-circle" },
        { name: "sightseeing", icon: "mdi-walk" }
      ],
      nav_lists: [
        { name: "basic info", icon: "mdi-airplane", link: "/about" },
        {
          name: "plans",
          icon: "mdi-notebook-outline",
          lists: [
            { name: "day1", link: "/plans" },
            { name: "day2", link: "/day2" },
            { name: "day3", link: "/day3" }
          ]
        },
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
