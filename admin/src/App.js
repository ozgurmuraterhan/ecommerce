import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Routes } from "@Helpers/Routes/routes";

import AlertState from "./context/Alert/alertState";

function App({ store, persistor, basename }) {
  return (
    /* Provide Redux store */
    <Provider store={store}>
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
