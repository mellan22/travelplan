//travel_idに紐づく情報を表示する。

<template>
  <div>
    <div v-for="info in basic_info" :key="info.destination">
      <v-card class="mx-5 my-5" max-width="800">
        <v-img class="white--text align-end" height="200px" :src="image_src">
          <v-card-title>{{ info.destination }}</v-card-title>
        </v-img>
        <v-card-subtitle class="title"
          >{{ info.start_date }} 〜 {{ info.end_date }}</v-card-subtitle
        >
        <v-card-text class="text--primary">
          {{ info.goal }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-dialog v-model="basic_info_dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" text>Edit</v-btn>
            </template>
            <basicInfoForm @from-child="closeBasicInfoForm"></basicInfoForm>
          </v-dialog>

          <v-btn text>
            <router-link
              v-bind:to="{ name: 'plan', params: { travel_id: travel_id } }"
              >Detail</router-link
            >
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import basicInfoForm from "./basicInfoForm";

export default {
  props: {
    travel_id: {},
  },
  components: {
    basicInfoForm,
  },
  data() {
    return {
      image_src: require("../assets/stockholm.jpg"),
      basic_info: null,
      basic_info_dialog: null,
      hasNoTravels: null,
    };
  },
  created() {
    this.getUserBasicData();
  },
  methods: {
    getUserBasicData: async function() {
      console.log(this.travel_id);
      const db = this.$firebase.firestore();
      let info = [];
      const info_ref = db.collection("basic_info").doc(this.travel_id);
      info_ref.onSnapshot((doc) => {
        info.push(doc.data());
      });
      this.basic_info = info;
    },
    closeBasicInfoForm() {
      this.basic_info_dialog = !this.basic_info_dialog;
    },
  },
};
</script>
