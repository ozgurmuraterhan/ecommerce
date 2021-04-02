import { useState, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthContext } from "./shared/context/auth-context";

// Pages
// import HomePage from "./pages/Home/HomePage";
// import Register from "./pages/Auth/Register/index";
// import Login from "./pages/Auth/Login/index";
// import ProductPage from "./pages/Product/ProductPage";
// import CartPage from "./pages/Cart/CartPage";
// import PageNotFound from "./pages/PageNotFound/PageNotFound";
// import routes from "./shared/config/Routes/routes";
import routes from "./shared/config/Routes/routes";

// Components
import Navbar from "./components/Navbar/Navbar";
import Backdrop from "./components/Backdrop/Backdrop";
import SideDrawer from "./components/SideDrawer/SideDrawer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const [sideDrawerToggle, setSideDrawerToogle] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <Navbar click={() => setSideDrawerToogle(true)} />
        <SideDrawer
          show={sideDrawerToggle}
          click={() => setSideDrawerToogle(false)}
        />
        <Backdrop
          show={sideDrawerToggle}
          click={() => setSideDrawerToogle(false)}
        />

        <main>
          <Switch>
            {/* <Route path="/" component={HomePage} exact />
            <Route path="/Register" component={Register} exact />
            <Route path="/Login" component={Login} exact />
            <Route path="/product/:id" component={ProductPage} exact />
            <Route path="/cart" component={CartPage} exact />
            <Route path="/*" component={PageNotFound} exact /> */}
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
                exact
              />
            ))}
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
