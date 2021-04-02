import { useState, useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthContext } from "@Context/auth-context";

import routes from "@Helpers/Routes/routes";

// Components
import Navbar from "@Components/Navbar/Navbar";
import Backdrop from "@Components/Backdrop/Backdrop";
import SideDrawer from "@Components/SideDrawer/SideDrawer";

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
