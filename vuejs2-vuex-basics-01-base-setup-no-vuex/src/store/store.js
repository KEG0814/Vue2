import Vue from "vue";
import Vuex from "vuex";

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
      user.isregistering = false;

      const registration = {
        userId: user.id,
        name: user.name,
        date: `${date.getMonth()}/${date.getDay()}`,
      };
      state.registrations.push(registration);
    },

    userUnregistered: (state, register) => {
      const user = state.users.find((user) => {
        return user.id == register.userId;
      });
      user.registered = false;
      state.registrations.splice(state.registrations.indexOf(register), 1);
    },
  },
  actions: {
    register: ({ commit }, user) => {
      user.isregistering = true;
      setTimeout(() => {
        commit("userRegistered", user);
      }, 1000);
    },
    unregister: (context, register) => {
      context.commit("userUnregistered", register);
    },
  },
});
