import { defineStore } from "pinia";

const useUserStore = defineStore("user", {
  state: () => {
    if (!localStorage.getItem("user-data"))
      return { isAuth: false, userData: {}, theme: "Light" };

    return {
      isAuth: true,
      userData: JSON.parse(localStorage.getItem("user-data")),
      theme: JSON.parse(localStorage.getItem("theme")) || "Light",
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
      this.theme = JSON.parse(localStorage.getItem("theme")) || "Light";
    },
    logoutUser() {
      this.isAuth = false;
      this.userData = {};
      this.theme = "Light";
    },
    toggleTheme() {
      if (this.theme === "Light") {
        this.theme = "Dark";
      } else {
        this.theme = "Light";
      }
    },
  },
});

export default useUserStore;
