<template>
  <div id="registration">
    <h3>Register here</h3>
    <hr />
    <div class="row" v-for="(user, idx) in users" :key="idx">
      <h4>{{ user.name }}</h4>
      <button :disabled="user.isregistering" @click="registerUser(user)">
        Register
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
//import { mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters({
      users: "unregisteredUsers",
    }),
  },

  methods: {
    // ...mapMutations({
    //   registerUser: "userRegistered",
    // }),
    ...mapActions({
      registerUser: "register",
    }),

    // registerUser(user) {
    //   this.$store.dispatch("register", user);
    // },
  },
};
</script>

<style scoped>
#registration {
  box-shadow: 1px 1px 2px 1px #ccc;
  margin: 20px;
  padding: 20px;
  display: inline-block;
  width: 300px;
  vertical-align: top;
}

.row h4 {
  display: inline-block;
  width: 70%;
  text-align: left;
  margin: 0 0 10px 0;
}

button {
  background-color: lightgreen;
  border: none;
  box-shadow: 1px 1px 1px black;
  font-size: inherit;
  text-align: right;
  cursor: pointer;
}

button:hover {
  background-color: green;
}
</style>
