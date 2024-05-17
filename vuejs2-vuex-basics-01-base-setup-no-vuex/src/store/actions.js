export default {
  register: ({ commit }, user) => {
    user.isregistering = true;
    setTimeout(() => {
      commit("userRegistered", user);
    }, 1000);
  },
  unregister: (context, register) => {
    context.commit("userUnregistered", register);
  },
};
