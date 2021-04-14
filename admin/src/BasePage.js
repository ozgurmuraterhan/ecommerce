import { Redirect, Switch, Route } from "react-router-dom";
import { Layout } from "@Template/layout/Layout";

import HomePage from "@Pages/Home/HomePage";
import Register from "@Pages/Auth/Register/index";
import Login from "@Pages/Auth/Login/index";

// Product
import ProductsList from "@Modules/Products/products-list";
import { ProductAdd } from "@Modules/Products/product-add";
import ProductDetails from "@Modules/Products/product-details";
import { ProductEdit } from "@Modules/Products/product-edit";

// ProductCategory
import ProductCategoriesList from "@Modules/ProductCategories/productCategories-list";
import { ProductCategoryAdd } from "@Modules/ProductCategories/productCategory-add";
import ProductCategoryDetails from "@Modules/ProductCategories/productCategory-details";
import { ProductCategoryEdit } from "@Modules/ProductCategories/productCategory-edit";

import CartPage from "@Pages/Cart/CartPage";

const BasePage = () => {
  return (
    <Layout>
      <Switch>
        {/* {
        <Redirect exact from="/" to="/" />
      } */}
        <Route path="/" component={HomePage} exact />
        <Route path="/Register" component={Register} exact />
        <Route path="/Login" component={Login} exact />

        {/* Product */}
        <Route path="/Product" component={ProductsList} exact />
        <Route path="/Product/Add" component={ProductAdd} exact />
        <Route path="/Product/:id" component={ProductDetails} exact />
        <Route path="/Product/Edit/:id" component={ProductEdit} exact />

        {/* Product Category */}
        <Route
          path="/ProductCategory"
          component={ProductCategoriesList}
          exact
        />
        <Route
          path="/ProductCategory/Add"
          component={ProductCategoryAdd}
          exact
        />
        <Route
          path="/ProductCategory/:id"
          component={ProductCategoryDetails}
          exact
        />
        <Route
          path="/ProductCategory/Edit/:id"
          component={ProductCategoryEdit}
          exact
        />

        <Route path="/Cart" component={CartPage} exact />

        <Redirect to="error/error-v6" />
      </Switch>
    </Layout>
  );
};

export default BasePage;
