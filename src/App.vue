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
      <div v-if="isSignedIn">
        <v-btn dark outlined @click="signOut">logout</v-btn>
      </div>
      <div v-else>
        <v-btn dark outlined @click="signIn">login</v-btn>
      </div>
    </v-app-bar>
    <v-content>
      <div v-if="isSignedIn">
        <router-view />
      </div>
      <div v-else>
        login from navigation menu above!
      </div>
    </v-content>
    <v-footer dark app>
      Vuetify
    </v-footer>
  </v-app>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      drawer: null,
      plan_dialog: null,
      value: null,
      user: null,
      isSignedIn: null,
      nav_lists: [
        {
          name: "manage travels",
          icon: "mdi-airplane",
          lists: [
            { name: "other travels", link: "/" },
            { name: "invite members", link: "/" },
          ],
        },
        {
          name: "settings",
          icon: "mdi-palette",
          lists: [
            { name: "change theme", link: "/names" },
            { name: "edit basic info", link: "/basic_form" },
          ],
        },
      ],
    };
  },
  created() {
    this.onAuthStateChanged();
  },
  methods: {
    signIn() {
      const provider = new this.$firebase.auth.GoogleAuthProvider();
      this.$firebase.auth().signInWithRedirect(provider);
    },
    // ログアウト
    signOut() {
      this.$firebase.auth().signOut();
    },
    // ログインしてるかチェックする
    isUserSignedIn() {
      return !!this.$firebase.auth().currentUser || false;
    },
    onAuthStateChanged() {
      this.$firebase.auth().onAuthStateChanged((user) => {
        this.user = user;
        this.isSignedIn = user ? true : false;
        this.userCheck();
      });
    },
    // 初回ログインかどうかをチェックする処理
    userCheck() {
      const user = this.$firebase.auth().currentUser;
      //login状態じゃない時はreturn
      if (!user) {
        return;
      }
      const db = this.$firebase.firestore();
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          //初回ログインの時はusersに追加
          if (!doc.exists) {
            db.collection("users")
              .doc(user.uid)
              .set({
                travel_id: [],
              });
          }
        });
    },
  },
};
</script>
