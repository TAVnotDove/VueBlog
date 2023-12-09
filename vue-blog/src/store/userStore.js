import { defineStore } from "pinia";

const useUserStore = defineStore("user", {
  state: () => ({ isAuth: false, user: {} }),
  getters: {
    getIsAuth(state) {
      return state.isAuth;
    },
  },
  actions: {
    loginUser(userData) {
      this.isAuth = true;
      this.user = userData;
    },
    logoutUser() {
      this.isAuth = false;
      this.user - {};
    },
  },
});

export default useUserStore;