import Vue from "vue";
import VueRouter from "vue-router";
import ProductListView from "../views/ProductListView";
import TransactionListView from "../views/TransactionListView";
Vue.use(VueRouter);

const routes = [
  {
    path: "/products/transactions",
    name: "transactions",
    component: TransactionListView
  },
  {
    path: "/products",
    name: "products",
    component: ProductListView
  },
  { path: "*", redirect: "/products" }
];

const router = new VueRouter({
  routes
});

export default router;
