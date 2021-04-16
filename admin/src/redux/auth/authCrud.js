import axios from "axios";
import url from "@Helpers/api/url.json";

// export const LOGIN_URL = "api/auth/login";
export const LOGIN_URL = `${url.LOGIN_URL}`;
// export const LOGIN_URL = "https://pooyaandishan.ir/api/User/Login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "api/me";

export const login = (username, password) => {
  return axios.post(LOGIN_URL, {
    username: username,
    password: password,
    // Source: "Web",
  });
};

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
