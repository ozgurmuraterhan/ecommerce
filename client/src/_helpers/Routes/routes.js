// Pages
import HomePage from "../../pages/Home/HomePage";
import Register from "../../pages/Auth/Register/index";
import Login from "../../pages/Auth/Login/index";
import ProductPage from "../../pages/Product/ProductPage";
import CartPage from "../../pages/Cart/CartPage";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/Register",
    component: Register,
  },
  {
    path: "/Login",
    component: Login,
  },
  {
    path: "/product/:id",
    component: ProductPage,
  },
  {
    path: "/cart",
    component: CartPage,
  },
  {
    path: "/*",
    component: PageNotFound,
  },
];

export default routes;
