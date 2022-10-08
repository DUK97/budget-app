import Vue from "vue";
import App from "./App.vue";
import "./components/plugins/elements/";
import store from "./components/store/index";

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
