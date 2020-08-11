import Vue from "vue";
import VueRouter from "vue-router";
import ProductListView from "../views/ProductListView.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/products",
    name: "Products",
    component: ProductListView
  },
  { path: "*", redirect: "/products" }
];

const router = new VueRouter({
  routes
});

export default router;
