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
              <v-text-field
                label="start from*"
                :rules="[rules.required]"
                :value="start_date"
                @input="$emit('update:start_date', start_date)"
              >
                <template v-slot:append-outer>
                  <date-picker v-model="start_date" />
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                label="come back on*"
                :rules="[rules.required]"
                :value="end_date"
                @input="$emit('update:end_date', end_date)"
              >
                <template v-slot:append-outer>
                  <date-picker v-model="end_date" />
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="destination*"
                :rules="[rules.required]"
                :value="destination"
                @input="$emit('update:destination', destination)"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="goal"
                @input="$emit('update:goal', goal)"
                :value="goal"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">close</v-btn>
        <v-btn
          type="submit"
          color="blue darken-1"
          text
          class="mr-3"
          @click="$emit('submit')"
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
  props: {
    start_date: null,
    end_date: null,
    destination: null,
    goal: null,
  },
  data() {
    return {
      rules: {
        required: (value) => !!value || "必ず入力してください",
      },
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    // sendBasicData() {
    //   if (!this.$refs.basic_form.validate()) {
    //     return;
    //   }
    // },
  },
};
</script>
