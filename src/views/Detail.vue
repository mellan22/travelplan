<template>
  <div>
    <div v-for="plan in plans" :key="plan.time">
      <v-card class="mx-5 my-5" max-width="800">
        <v-card-title>{{ plan.date }}</v-card-title>
        <v-card-subtitle class="title">{{ plan.summary }} </v-card-subtitle>
        <v-card-text class="text--primary">
          {{ plan.time }} {{ plan.content }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange" text>
            edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <v-layout justify-center>
      <v-dialog v-model="plan_dialog" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">add new plan</v-btn>
        </template>
        <!-- 子コンポーネントからフォームを閉じる指令を受け取る -->
        <inputPlan
          :travel_id="travel_id"
          @from-child="closeInputForm"
        ></inputPlan>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import inputPlan from "../components/inputPlan";

export default {
  components: {
    inputPlan,
  },
  data() {
    return {
      plan_dialog: null,
      plans: null,
      travel_id: null,
    };
  },
  created() {
    this.getTravelDetailData();
  },
  methods: {
    closeInputForm() {
      this.plan_dialog = !this.plan_dialog;
    },
    getTravelDetailData: async function() {
      this.travel_id = this.$route.params.travel_id;
      console.log(this.travel_id);
      const db = this.$firebase.firestore();
      let info = [];
      const plan_ref = db
        .collection("plans")
        .doc(this.travel_id)
        .collection("data");
      plan_ref.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          info.push(doc.data());
        });
      });
      this.plans = info;
    },
  },
};
</script>
