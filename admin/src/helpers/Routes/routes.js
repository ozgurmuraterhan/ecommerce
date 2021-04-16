import { Redirect, Switch, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import BasePage from "~/BasePage";
// import { Logout, AuthPage } from "@Modules/Auth";
import Login from "@Modules/Auth/Login";
import Register from "@Modules/Auth/Register";
import Logout from "@Modules/Auth/Logout";
import ErrorsPage from "@Modules/ErrorsExamples/ErrorsPage";

export const Routes = () => {
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
    }),
    shallowEqual
  );

  return (
    <Switch>
      {!isAuthorized ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route path="/login" component={Login} />
      ) : (
        /*Otherwise redirect to root page (`/`)*/
        <Redirect from="/Login" exact={true} to="/" />
      )}

      {!isAuthorized ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route path="/register" component={Register} />
      ) : (
        /*Otherwise redirect to root page (`/`)*/
        <Redirect from="/Register" exact={true} to="/" />
      )}

      <Route path="/error" component={ErrorsPage} />
      <Route path="/logout" component={Logout} />

      {!isAuthorized ? (
        /*Redirect to `/auth` when user is not authorized*/
        <Redirect to="/login" />
      ) : (
        // <Layout>
        <BasePage />
        // </Layout>
      )}

      {/* 
      <Route>
        <BasePage />
      </Route>*/}
    </Switch>
  );
};
