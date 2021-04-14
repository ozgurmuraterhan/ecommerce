import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
// import config from '../app/_services/config.json';

const setupAxios = (axios, store) => {
  axios.interceptors.request.use(
    (config) => {
      const {
        auth: { authToken },
      } = store.getState();

      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );

  axios.interceptors.response.use(null, (error, response) => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (expectedError) {
      if (error.response.status === 401) {
        // console.log('debug ::: authToken ::: ', authToken);

        // const { user: { accessToken, refreshToken } } = store.getState()
        // const data = {
        //   "accessToken": user.accessToken,
        //   "refreshToken": user.refreshToken,
        //   "Source": "Web"
        // }
        // axios.post(`${config.USERS_URL}/refresh`, data)
        //   .then(function (response) {
        //     console.log('debug ::: response ::: ', response);
        //     return response;
        //   })
        //   .catch(function () {
        //     console.log('debug ::: catch ::: CATCH');
        //     // logout();
        //   });

        NotificationManager.error(
          "Please exit and enter again",
          error.response.status,
          6000,
          null,
          true
        );
      } else if (
        error.response.status === 404 &&
        error.response.data.errors &&
        error.response.data.errors[0].code === "UserNotFoundError!"
      ) {
        NotificationManager.error(
          error.response.data.errors[0].message.fa,
          error.response.status,
          6000,
          null,
          true
        );
      } else if (error.response.status === 404 && error.response.data) {
        NotificationManager.error(
          "No item for show!",
          error.response.status,
          6000,
          null,
          true
        );
      } else if (error.response.status === 500) {
        NotificationManager.error(
          "Error in connect to server!",
          error.response.status,
          6000,
          null,
          true
        );
      } else {
        NotificationManager.error(
          "some problem!",
          error.response.status,
          6000,
          null,
          true
        );
      }
    } else if (!expectedError) {
      NotificationManager.error(
        error.message,
        "Error in connect to server!",
        6000,
        null,
        true
      );
    }

    return Promise.reject(error);
  });
};

export default setupAxios;
