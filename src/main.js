import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from "jquery";

import VueFirestore from "vue-firestore";
import { fb } from "./firebase";
require("firebase/firestore");

Vue.use(VueFirestore, {
  key: "id", // the name of the property. Default is '.key'.
  enumerable: true //  whether it is enumerable or not. Default is true.
});

Vue.use(VueFirestore);
window.$ = window.jQuery = jQuery;

import Vue2Filters from 'vue2-filters'
 
Vue.use(Vue2Filters)

import "popper.js";
import "bootstrap";
import "./assets/app.scss";

import Swal from "sweetalert2";
window.Swal = Swal;


const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000
});
window.Toast = Toast;


import store from './store.js';

Vue.component("Navbar", require("./components/Navbar.vue").default);
Vue.component("add-to-cart", require("./components/AddToCart.vue").default);
Vue.component("mini-cart", require("./components/MiniCart.vue").default);
Vue.component("ProductList", require("./sections/ProductList.vue").default);


import VueCarousel from 'vue-carousel/dist/vue-carousel.min';

Vue.use(VueCarousel);


Vue.config.productionTip = false;

let app = "";

fb.auth().onAuthStateChanged(function(user) {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
