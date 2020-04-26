<template>
  <div>
    <div v-for="info in basic_info" :key="info">
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
            detail
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
      console.log(info);
      this.basic_info = info;
    },
  },

  // .where(
  //   this.$firebase.firestore.FieldPath.documentId(),
  //   "in",
  //   this.travel_id
  // );
  // info_ref.get().then(function(querySnapshot) {
  //   querySnapshot.forEach(function(doc) {
  //     console.log(doc.id, " => ", doc.data());
  //     info.push(doc.data());
  //     console.log(info);
  //   });
  // });
  // this.basic_info = info;

  // const basic_data_ref = db.collection("basic_info").doc();
  // if (user) {
  //   // message に変更があったときのハンドラを登録
  //   ref_message.limitToLast(10).on("child_added", this.childAdded);
  // } else {
  //   // message に変更があったときのハンドラを解除
  //   ref_message.limitToLast(10).off("child_added", this.childAdded);
  // }
  // mounted() {
  //   async () => {
  //     const db = this.$firebase.firestore();
  //     const info_ref = db.collection("basic_info").doc();
  //     const info_doc = await info_ref.get();
  //     if (info_doc.exists) {
  //       console.log(info_doc.data());
  //       this.basic_info = info_doc.data();
  //     }
  //   };
  // info_ref.get().then((doc) => {
  //   if (doc.exists) {
  //     this.basic_info = doc.data();
  //     console.log(doc.data());
  //   } else {
  //     console.log("404");
  //   }
  // this.basic_info = info;
  // .then((snap) => {
  //   const basic_info = [];
  //   snap.forEach((doc) => {
  //     basic_info.push({ [doc.id]: doc.data() });
  //   });
  //   this.basic_info = basic_info;
  // });
  // });
  // },
};
</script>
