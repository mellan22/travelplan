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
    <v-app-bar v-bind:src="colorSrc" hide-on-scroll dark app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>travelplan</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu top offset-y>
        <template v-slot:activator="{ on }">
          <v-btn class="mx-3" dark outlined v-on="on">change color</v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in colour"
            :key="index"
            @click="changeColor(item.title)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

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
        <v-row style="height: 100px;" justify="center" align-content="center">
          login from the button above!
        </v-row>
      </div>
    </v-content>
    <v-footer dark app></v-footer>
  </v-app>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      colorSrc: require("./assets/Kye Meh.jpg"),
      drawer: null,
      plan_dialog: null,
      value: null,
      user: null,
      isSignedIn: null,
      colour: [
        { title: "Dania" },
        { title: "Dawn" },
        { title: "Sweet Morning" },
        { title: "Kye Meh" },
      ],
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
            { name: "change theme", link: "/" },
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
    changeColor(name) {
      return (this.colorSrc = require("./assets/" + name + ".jpg"));
    },
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
