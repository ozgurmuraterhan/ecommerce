import { Redirect, Switch, Route } from "react-router-dom";
import HomePage from "@Pages/Home/HomePage";
import Register from "@Pages/Auth/Register/index";
import Login from "@Pages/Auth/Login/index";
import ProductPage from "@Pages/Product/ProductPage";
import CartPage from "@Pages/Cart/CartPage";
// import ProductsPage from "@Modules/Products/ProductsPage";

const BasePage = () => {
  return (
    <Switch>
      {/* {
        <Redirect exact from="/" to="/" />
      } */}
      <Route path="/" component={HomePage} exact />
      <Route path="/Register" component={Register} />
      <Route path="/Login" component={Login} />
      <Route path="/ProductPage" component={ProductPage} />
      <Route path="/Cart" component={CartPage} />
      {/* <Route path="/Product" component={ProductsPage} /> */}

      <Redirect to="error/error-v6" />
    </Switch>
  );
};

export default BasePage;
