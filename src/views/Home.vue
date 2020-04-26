<template>
  <div>
    <about
      v-for="travel_id in travel_ids"
      :key="travel_id"
      :travel_id="travel_id"
    ></about>
    <v-layout justify-center>
      <v-dialog v-model="basic_data_dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">add new travel</v-btn>
        </template>
        <!-- 子コンポーネントからフォームを閉じる指令を受け取る -->
        <inputBasicData @from-child="closeBasicForm"></inputBasicData>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import inputBasicData from "../components/inputBasicData";
import about from "../components/About";

export default {
  components: {
    about,
    inputBasicData,
  },
  props: {},
  data() {
    return {
      travel_ids: null,
      basic_data_dialog: null,
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    getUserData: async function() {
      const db = this.$firebase.firestore();
      const user = this.$firebase.auth().currentUser;
      if (!user) {
        return;
      }
      const user_ref = db.collection("users").doc(user.uid);
      const user_snap = await user_ref.get();
      if (!user_snap.exists) {
        console.log("no user");
        return;
      }
      this.travel_ids = user_snap.data().travel_id;
    },
    closeBasicForm() {
      this.basic_data_dialog = !this.basic_data_dialog;
    },
  },
};
</script>
