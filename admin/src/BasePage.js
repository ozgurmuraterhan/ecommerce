import { Redirect, Switch, Route } from "react-router-dom";
import { Layout } from "@Template/layout/Layout";

import { Dashboard } from "@Modules/Dashboard";

// Role
import RolesList from "@Modules/Roles/roles-list";
import { RoleAdd } from "@Modules/Roles/role-add";
import RoleDetails from "@Modules/Roles/role-details";
import { RoleEdit } from "@Modules/Roles/role-edit";

// User
import UsersList from "@Modules/Users/users-list";
import { UserAdd } from "@Modules/Users/user-add";
import UserDetails from "@Modules/Users/user-details";
import { UserEdit } from "@Modules/Users/user-edit";

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
        {
          // Redirect from root URL to /dashboard.
          <Redirect exact from="/" to="/dashboard" />
        }
        <Route path="/dashboard" component={Dashboard} exact />

        {/* Role */}
        <Route path="/Role" component={RolesList} exact />
        <Route path="/Role/Add" component={RoleAdd} exact />
        <Route path="/Role/:id" component={RoleDetails} exact />
        <Route path="/Role/Edit/:id" component={RoleEdit} exact />

        {/* User */}
        <Route path="/User" component={UsersList} exact />
        <Route path="/User/Add" component={UserAdd} exact />
        <Route path="/User/:id" component={UserDetails} exact />
        <Route path="/User/Edit/:id" component={UserEdit} exact />

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
