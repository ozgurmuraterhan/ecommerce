import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/Home/HomePage";
import ProductPage from "./pages/Product/ProductPage";
import CartPage from "./pages/Cart/CartPage";

// Components
import Navbar from "./components/Navbar/Navbar";
import Backdrop from "./components/Backdrop/Backdrop";
import SideDrawer from "./components/SideDrawer/SideDrawer";

function App() {
  const [sideDrawerToggle, setSideDrawerToogle] = useState(false);

  return (
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
          <Route path="/" component={HomePage} exact />
          <Route path="/product/:id" component={ProductPage} exact />
          <Route path="/cart" component={CartPage} exact />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
