import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { LoginForm } from "./loginForm";

const initUser = {
  username: "",
  password: "",
};

const Login = (props) => {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.replace("/");
    }
  }, []);

  const loginUser = async (values) => {
    console.log("debug ::: login_values ::: ", values);

    const data = {
      username: values.username,
      password: values.password,
    };

    console.log("debug ::: login_data ::: ", data);

    axios
      .post("http://localhost:8000/api/v1/login", data)
      .then((response) => {
        console.log(response);
        // localStorage.setItem("token", response.headers["x-auth-token"]);
        localStorage.setItem("token", response.data.token);
        history.replace("/");
      })
      .catch((error) => {
        console.log(error);
        alert("some problem !!!");
      });
  };

  const btnRef = useRef();
  const loginUserClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToHome = () => {
    history.push(`/`);
  };

  return (
    <div className="container">
      <div>
        <h4>Login</h4>
      </div>
      <div>
        <button type="button" onClick={backToHome} className="btn btn-light">
          <i className="fa fa-arrow-left"></i>
          Back
        </button>
        {`  `}
        <button
          type="submit"
          className="btn btn-primary ml-2"
          onClick={loginUserClick}
        >
          Save
        </button>
      </div>
      <div>
        <LoginForm user={initUser} btnRef={btnRef} loginUser={loginUser} />
      </div>
    </div>
  );
};

export default Login;
