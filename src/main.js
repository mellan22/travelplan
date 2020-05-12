import Vue from "vue";
import App from "./App.vue";
import { firestorePlugin } from "vuefire";
import vuetify from "./plugins/vuetify";
import router from "./router";

/* Import the firebase SDK and extend with firestore */
const firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");

Vue.use(firestorePlugin);
const firebaseConfig = {
  apiKey: "AIzaSyBxKS-rvKqF29vjOEDYKWYZ2KmJgp1pLWE",
  authDomain: "travelplan-af237.firebaseapp.com",
  databaseURL: "https://travelplan-af237.firebaseio.com",
  projectId: "travelplan-af237",
  storageBucket: "travelplan-af237.appspot.com",
  messagingSenderId: "605088851558",
  appId: "1:605088851558:web:76cf81cf40c934e234efa7",
  measurementId: "G-D70QX9W84C",
};

/* Initialize firebase with your configuration */
firebase.initializeApp(firebaseConfig);

/* Bind firebase to your Vue instance */
Vue.prototype.$firebase = firebase;

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
