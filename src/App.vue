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
        <div v-if="isSignedIn">
          <v-btn @click="signOut">logout</v-btn>
        </div>
        <div v-else>
          <v-btn @click="signIn">login</v-btn>
        </div>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar src="./assets/Kye Meh.jpg" hide-on-scroll dark app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>travelplan</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-dialog v-model="plan_dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn dark v-on="on" outlined>add new plan</v-btn>
        </template>
        <!-- 子コンポーネントからフォームを閉じる指令を受け取る -->
        <inputPlan @from-child="closeInputForm"></inputPlan>
      </v-dialog>
      <!-- <v-menu offset-y>
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
      </v-menu> -->
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
// import DatePicker from "./components/DatePicker";
import inputPlan from "./components/inputPlan";

export default {
  name: "App",
  components: {
    inputPlan,
  },
  data() {
    return {
      drawer: null,
      plan_dialog: null,
      value: null,
      user: null,
      isSignedIn: null,
      plantypes: [
        { name: "transport", icon: "mdi-bus-multiple" },
        { name: "hotel", icon: "mdi-home-circle" },
        { name: "sightseeing", icon: "mdi-walk" },
      ],
      members: [
        { name: "Linda", phone: "XX-XXX-XXXX" },
        { name: "Michael", phone: "XX-XXX-XXXX" },
        { name: "Maria", phone: "XX-XXX-XXXX" },
      ],
      nav_lists: [
        { name: "basic info", icon: "mdi-airplane", link: "/about" },
        {
          name: "plans",
          icon: "mdi-notebook-outline",
          lists: [
            { name: "day1", link: "/plans" },
            { name: "day2", link: "/day2" },
            { name: "day3", link: "/day3" },
          ],
        },
        {
          name: "members",
          icon: "mdi-account-multiple-check",
          lists: [
            { name: "names", link: "/names" },
            { name: "details", link: "/details" },
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
    closeInputForm() {
      this.plan_dialog = !this.plan_dialog;
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
