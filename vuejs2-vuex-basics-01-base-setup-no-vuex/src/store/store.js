import Vue from "vue";
import Vuex from "vuex";

import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    registrations: [],
    users: [
      { id: 1, name: "Max", registered: false, isregistering: false },
      { id: 2, name: "Anna", registered: false, isregistering: false },
      { id: 3, name: "Chris", registered: false, isregistering: false },
      { id: 4, name: "Sven", registered: false, isregistering: false },
    ],
  },
  getters,
  mutations,
  actions,
});
