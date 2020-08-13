import Vue from "vue";
import VueRouter from "vue-router";
import ProductListView from "../views/ProductListView";
import MovementListView from "../views/MovementListView";
import ProductMovementsView from "../views/ProductMovementsView";
Vue.use(VueRouter);

const routes = [
  {
    path: "/movements",
    name: "movements",
    component: MovementListView
  },
  {
    path: "/products",
    name: "products",
    component: ProductListView
  },
  {
    path: "/products/:id/movements",
    name: "productMovements",
    component: ProductMovementsView
  },
  { path: "*", redirect: "/products" }
];

const router = new VueRouter({
  routes
});

export default router;
