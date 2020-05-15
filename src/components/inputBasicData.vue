<template>
  <v-card>
    <v-card-title>
      <span class="headline">add new Travel</span>
    </v-card-title>
    <v-form ref="basic_form">
      <v-card-text>
        <v-container>
          <v-row>
            <!-- https://qiita.com/fukuman/items/b0bc84081ad0d2bc522aあとでこれで直す -->
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="start from*" required v-model="start_date">
                <template v-slot:append-outer>
                  <date-picker v-model="start_date" />
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field label="come back on*" required v-model="end_date">
                <template v-slot:append-outer>
                  <date-picker v-model="end_date" />
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="destination"
                label="destination*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="goal" label="goal"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">close</v-btn>
        <v-btn color="blue darken-1" text class="mr-3" @click="sendBasicData"
          >start Planning</v-btn
        >
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import DatePicker from "./DatePicker";

export default {
  name: "App",
  components: {
    DatePicker,
  },
  data() {
    return {
      start_date: null,
      end_date: null,
      destination: null,
      goal: null,

      members: [
        { name: "Linda", phone: "XX-XXX-XXXX" },
        { name: "Michael", phone: "XX-XXX-XXXX" },
        { name: "Maria", phone: "XX-XXX-XXXX" },
      ],
    };
  },
  methods: {
    close() {
      this.$emit("from-child");
    },
    sendBasicData() {
      const self = this;
      this.$emit("from-child");
      const user = this.$firebase.auth().currentUser;
      //basic_infoにデータを登録
      const db = this.$firebase.firestore();
      const batch = db.batch();

      const info_ref = db.collection("basic_info").doc();
      batch.set(info_ref, {
        start_date: this.start_date,
        end_date: this.end_date,
        destination: this.destination,
        goal: this.goal,
        create_uid: user.uid,
      });
      const user_ref = db.collection("users").doc(user.uid);
      batch.update(user_ref, {
        travel_id: this.$firebase.firestore.FieldValue.arrayUnion(info_ref.id),
      });
      batch
        .commit()
        .then(function() {
          console.log("batch end");
          return;
        })
        .catch(function(error) {
          console.log(error);
          self.hasError = true;
          self.errorMessage = "Oops!";
          return;
        });
    },
  },
};
</script>
