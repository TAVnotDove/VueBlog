import { defineStore } from "pinia";

const useUserStore = defineStore("user", {
  state: () => {
    if (!localStorage.getItem("user-data"))
      return { isAuth: false, userData: {} };

    return {
      isAuth: true,
      userData: JSON.parse(localStorage.getItem("user-data")),
    };
  },
  getters: {
    getIsAuth(state) {
      return state.isAuth;
    },
    getUserData(state) {
      return state.userData;
    },
  },
  actions: {
    loginUser(userData) {
      this.isAuth = true;
      this.userData = userData;
    },
    logoutUser() {
      this.isAuth = false;
      this.userData = {};
    },
  },
});

export default useUserStore;
