import React, { useReducer } from "react";
// import uuid from 'uuid';
import { v4 as uuidv4 } from "uuid";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "./types";
import "react-notifications/lib/notifications.css";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";

const AlertState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // set alert
  const setAlert = (msg, type, timeout = 5000) => {
    // const id = uuid.v4();
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
    if (type === "error") {
      NotificationManager.error(msg, "Error", 5000, null, true);
    } else if (type === "success") {
      NotificationManager.success(msg, "success", 5000, null, true);
    }
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert,
      }}
    >
      {props.children}
      <NotificationContainer />
    </AlertContext.Provider>
  );
};

export default AlertState;
