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
          <v-btn color="orange" text>
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
export default {
  props: {
    travel_id: {},
  },
  data() {
    return {
      image_src: require("../assets/stockholm.jpg"),
      basic_info: null,
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
  },
};
</script>
