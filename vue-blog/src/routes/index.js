import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Profile from "../pages/Profile.vue";
import Posts from "../pages/Posts.vue";
import PostDetails from "../pages/PostDetails.vue";
import CreatePost from "../pages/CreatePost.vue";
import EditPost from "../pages/EditPost.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/profile", component: Profile },
  { path: "/posts", component: Posts },
  { path: "/posts/:postId", component: PostDetails },
  { path: "/posts/create", component: CreatePost },
  { path: "/posts/:postId/edit", component: EditPost },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
