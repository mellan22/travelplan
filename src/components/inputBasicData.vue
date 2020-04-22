<template>
  <v-card>
    <v-card-title>
      <span class="headline">add new Travel</span>
    </v-card-title>
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
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="sendBasicData"
        >start Planning</v-btn
      >
    </v-card-actions>
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
      value: null,

      start: null,
      end: null,
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
    sendBasicData() {
      this.$emit("from-child", true);
      const db = this.$firebase.firestore();
      const info_ref = db.collection("basic_info").doc();
      info_ref.set({
        start_date: this.start_date,
        end_date: this.end_date,
        destination: this.destination,
        goal: this.goal,
      });
    },
  },
};
</script>
