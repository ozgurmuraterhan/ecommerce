/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */
import { Redirect, Switch, Route } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import BasePage from "~/BasePage";
import { Logout, AuthPage } from "@Modules/Auth";
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
      <Route>
        <BasePage />
      </Route>
    </Switch>
  );
};
