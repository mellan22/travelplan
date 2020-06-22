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
                v-model="date_form"
                :close-on-content-click="true"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    label="date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    :rules="[rules.required]"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="date_form = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-dialog
                ref="dialog"
                v-model="time_form"
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
                <v-time-picker v-if="time_form" v-model="time" full-width>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="time_form = false"
                    >Cancel</v-btn
                  >
                  <v-btn text color="primary" @click="$refs.dialog.save(time)"
                    >OK</v-btn
                  >
                </v-time-picker>
              </v-dialog>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="plantype"
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
export default {
  name: "App",
  props: {
    travel_id: null,
  },
  data() {
    return {
      date: null,
      time: null,
      plantype: null,
      content: null,
      booking_member: null,
      costs: null,
      date_form: false,
      time_form: false,
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
        // todo: costは数値だけ受け付けるようruleを追加
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
          time: this.time,
          type: this.selected_plantype,
        })
        .then(function() {
          console.log("plan_input_end");
        });
      // todo: ここでリアルタイム読み込みできるようにする
      // self.$router.go({
      //   path: self.$router.currentRoute.path,
      //   force: true,
      // });
    },
    cancel() {
      this.$emit("from-child", true);
    },
  },
};
</script>
