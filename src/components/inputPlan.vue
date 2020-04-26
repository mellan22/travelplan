<template>
  <v-card>
    <v-card-title>
      <span class="headline">add new plan</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="date*" v-model="date">
              <template v-slot:append-outer>
                <date-picker v-model="date" />
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="selected_time"
              class="px-2"
              standard
              :items="time"
              append-icon="mdi-clock-outline"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select
              v-model="selected_plantype"
              item-text="name"
              :items="plantypes"
              label="type"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="content"
              label="content"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="booking_member"
              item-text="name"
              :items="members"
              label="booked by"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="costs" label="costs" required></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="cancel">Close</v-btn>
      <v-btn color="blue darken-1" text @click="sendPlanData">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import DatePicker from "./DatePicker";

export default {
  name: "App",
  props: {
    travel_id: null,
  },
  components: {
    DatePicker,
  },
  data() {
    return {
      date: null,
      selected_time: null,
      selected_plantype: null,
      content: null,
      booking_member: null,
      costs: null,

      time: [
        "7:00",
        "8:00",
        "9:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
        "24:00",
        "1:00",
        "2:00",
        "3:00",
        "4:00",
        "5:00",
        "6:00",
      ],
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
    };
  },
  methods: {
    sendPlanData() {
      this.$emit("from-child", true);
      console.log(this.travel_id);
      const db = this.$firebase.firestore();
      const info_ref = db
        .collection("plans")
        .doc(this.travel_id)
        .collection(this.date)
        .doc();
      info_ref.set({
        booked_by: this.booking_member,
        content: this.content,
        costs: this.costs,
        date: this.date,
        time: this.selected_time,
        type: this.selected_plantype,
      });
      console.log("done");
    },
    cancel() {
      this.$emit("from-child", true);
    },
  },
};
</script>
