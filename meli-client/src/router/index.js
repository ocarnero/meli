import { createWebHistory, createRouter } from "vue-router";
import SearchResultPage from "../components/SearchResultPage.vue";
import ProdDetail from "../components/ProdDetail.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: SearchResultPage
  },
  {
    path: "/items",
    name: "Items",
    component: SearchResultPage
  },
  {
    path: "/items/:id",
    name: "ProductDetail",
    component: ProdDetail
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
