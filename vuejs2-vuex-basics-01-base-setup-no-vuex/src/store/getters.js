export default {
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
};
