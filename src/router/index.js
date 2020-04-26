import Vue from "vue";
import VueRouter from "vue-router";
import costs from "../views/costs.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/plan/:travel_id",
    name: "plan",
    component: () => import("../views/Detail.vue"),
    props: true,
  },
  {
    path: "/costs",
    name: "costs",
    component: costs,
  },
  {
    path: "/plans",
    name: "plans",
    component: () => import("../components/plans.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
