export default {
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
};
