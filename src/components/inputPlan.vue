<template>
  <v-card>
    <v-card-title>
      <span class="headline">add new plan</span>
    </v-card-title>
    <v-form ref="input_plan_form">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                v-model="menu2"
                :close-on-content-click="true"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="Picker without buttons"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
              <!-- <v-text-field
                label="date*"
                v-model="date"
                :rules="[rules.required]"
              >
                <template v-slot:append-outer>
                  <date-picker v-model="date" />
                </template>
              </v-text-field> -->
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-dialog
                ref="dialog"
                v-model="modal2"
                :return-value.sync="time"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="time"
                    label="time"
                    prepend-icon="mdi-clock-outline"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker v-if="modal2" v-model="time" full-width>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="modal2 = false"
                    >Cancel</v-btn
                  >
                  <v-btn text color="primary" @click="$refs.dialog.save(time)"
                    >OK</v-btn
                  >
                </v-time-picker>
              </v-dialog>
              <!-- <v-select
                v-model="selected_time"
                class="px-2"
                standard
                :items="time"
                append-icon="mdi-clock-outline"
              ></v-select> -->
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
                label="content*"
                :rules="[rules.required]"
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
              <v-text-field
                v-model="costs"
                label="costs"
                required
              ></v-text-field>
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
    </v-form>
  </v-card>
</template>

<script>
// import DatePicker from "./DatePicker";

export default {
  name: "App",
  props: {
    travel_id: null,
  },
  components: {
    // DatePicker,
  },
  data() {
    return {
      date: null,
      selected_time: null,
      selected_plantype: null,
      content: null,
      booking_member: null,
      costs: null,
      modal: false,
      modal2: false,

      time: null,
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
      rules: {
        required: (value) => !!value || "必ず入力してください",
      },
    };
  },
  methods: {
    sendPlanData() {
      if (!this.$refs.input_plan_form.validate()) {
        return;
      }
      this.$emit("from-child", true);
      console.log(this.travel_id);
      const db = this.$firebase.firestore();
      const plan_ref = db
        .collection("plans")
        .doc(this.travel_id)
        .collection("data")
        .doc();
      plan_ref
        .set({
          booked_by: this.booking_member,
          content: this.content,
          costs: this.costs,
          date: this.date,
          time: this.selected_time,
          type: this.selected_plantype,
        })
        .then(function() {
          console.log("plan_input_end");
          self.$router.go({
            path: self.$router.currentRoute.path,
            force: true,
          });
        });
      self.$router.go({
        path: self.$router.currentRoute.path,
        force: true,
      });
    },
    cancel() {
      this.$emit("from-child", true);
    },
  },
};
</script>
