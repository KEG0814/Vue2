import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    registrations: [],
    users: [
      { id: 1, name: "Max", registered: false },
      { id: 2, name: "Anna", registered: false },
      { id: 3, name: "Chris", registered: false },
      { id: 4, name: "Sven", registered: false },
    ],
  },
  getters: {
    unregisteredUsers: (state) => {
      return state.users.filter((user) => {
        return !user.registered;
      });
    },
    registeredUsers: (state) => {
      return state.registrations;
    },
    total: (state) => {
      return state.registrations.length;
    },
  },

  mutations: {
    userRegistered: (state, user) => {
      const date = new Date();
      user.registered = true;

      const registration = {
        userId: user.id,
        name: user.name,
        date: `${date.getMonth()}/${date.getDay()}`,
      };
      state.registrations.push(registration);
    },

    userUnregistered: (state, payload) => {
      const user = state.users.find((user) => {
        return user.id == payload.userId;
      });
      user.registered = false;
      state.registrations.splice(state.registrations.indexOf(payload), 1);
    },
  },
});
