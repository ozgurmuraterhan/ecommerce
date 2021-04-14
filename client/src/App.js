import { useState, useCallback } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Routes } from "@Helpers/Routes/routes";

import AlertState from "./context/Alert/alertState";

// Components
// import Navbar from "@Components/Navbar/Navbar";
// import Backdrop from "@Components/Backdrop/Backdrop";
// import SideDrawer from "@Components/SideDrawer/SideDrawer";

function App({ store, persistor, basename }) {
  // const [sideDrawerToggle, setSideDrawerToggle] = useState(false);

  return (
    /* Provide Redux store */
    <Provider store={store}>
      {/* <Navbar click={() => setSideDrawerToggle(true)} />

      <SideDrawer
        show={sideDrawerToggle}
        click={() => setSideDrawerToggle(false)}
      />

      <Backdrop
        show={sideDrawerToggle}
        click={() => setSideDrawerToggle(false)}
      /> */}

      <AlertState>
        {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
        <PersistGate persistor={persistor}>
          {/* Override `basename` (e.g: `homepage` in `package.json`) */}
          <BrowserRouter basename={basename}>
            <Routes />
          </BrowserRouter>
        </PersistGate>
      </AlertState>
    </Provider>
  );
}

export default App;
