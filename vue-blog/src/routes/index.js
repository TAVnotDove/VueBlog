import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Profile from "../pages/Profile.vue";
import Posts from "../pages/Posts.vue";
import PostDetails from "../pages/PostDetails.vue";
import CreatePost from "../pages/CreatePost.vue";
import EditPost from "../pages/EditPost.vue";

function authGuard(to, from) {
  if (!localStorage.getItem("user-data") && to.path !== "/login") {
    return { path: "/login" };
  }
}

function notAuthGuard(to, from) {
  if (localStorage.getItem("user-data") && to.path !== "/posts") {
    return { path: "/posts" };
  }
}

const routes = [
  {
    path: "/",
    component: Home,
    beforeEnter: (to, from) => notAuthGuard(to, from),
  },
  {
    path: "/login",
    component: Login,
    beforeEnter: (to, from) => notAuthGuard(to, from),
  },
  {
    path: "/register",
    component: Register,
    beforeEnter: (to, from) => notAuthGuard(to, from),
  },
  {
    path: "/profile",
    component: Profile,
    beforeEnter: (to, from) => authGuard(to, from),
  },
  {
    path: "/posts",
    component: Posts,
    beforeEnter: (to, from) => authGuard(to, from),
  },
  {
    path: "/posts/:postId",
    component: PostDetails,
    beforeEnter: (to, from) => authGuard(to, from),
  },
  {
    path: "/posts/create",
    component: CreatePost,
    beforeEnter: (to, from) => authGuard(to, from),
  },
  {
    path: "/posts/:postId/edit",
    component: EditPost,
    beforeEnter: (to, from) => authGuard(to, from),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
