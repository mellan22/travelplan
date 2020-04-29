// 日付ごとに詳細予定を表示するコンポーネント

<template>
  <div>
    <!-- TODO: データがないときはこのメッセージを出したい -->
    <!-- <div v-if="!hasPlans">
      <v-row style="height: 100px;" justify="center" align-content="center">
        you haven't started planning. <br />
        Let's add your plans from the button below!
      </v-row>
    </div> -->
    <div v-for="date in datelist" :key="date">
      <v-card class="mx-5 my-5" max-width="800">
        <v-card-title>{{ date }}</v-card-title>
        <!-- <v-card-subtitle class="title">{{ plan.summary }} </v-card-subtitle> -->
        <div v-for="plan in plans" :key="plan.time">
          <div v-if="date == plan.date">
            <v-card-text>
              <span class="indigo--text"> {{ plan.time }}</span>
              <span class="text--primary"> ：{{ plan.content }} </span>
            </v-card-text>
          </div>
        </div>
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
      datelist: null,
      travel_id: null,
      hasPlans: null,
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
      // let datebox = {};
      let info = [];
      let datelist = [];
      const plan_ref = db
        .collection("plans")
        .doc(this.travel_id)
        .collection("data");
      plan_ref
        .orderBy("date")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            if (datelist.indexOf(doc.data().date) == -1) {
              datelist.push(doc.data().date);
            }
            info.push(doc.data());
          });
        });
      this.datelist = datelist;
      this.plans = info;
    },
  },
};
</script>
