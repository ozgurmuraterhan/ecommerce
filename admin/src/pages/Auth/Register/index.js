import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { RegisterForm } from "./registerForm";

const initUser = {
  username: "",
  password: "",
  avatar: null,
};

const Register = () => {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerUser = (values) => {
    console.log("debug ::: addUser_values ::: ", values);

    let data = new FormData();
    data.append("username", values.username);
    data.append("password", values.password);
    if (values.avatar) {
      data.append("avatar", values.avatar);
    }
    for (var pair of data.entries()) {
      console.log("debug ::: addUser_values ::: ", pair[0] + ", " + pair[1]);
    }
    axios
      .post("http://localhost:8000/api/v1/register", data)
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.headers["x-auth-token"]);
        history.replace("/");
      })
      .catch((error) => {
        console.log(error);
        alert("some problem !!!");
      });
  };

  const btnRef = useRef();
  const registerUserClick = () => {
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
        <h4>Register</h4>
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
          onClick={registerUserClick}
        >
          Save
        </button>
      </div>
      <div>
        <RegisterForm
          user={initUser}
          btnRef={btnRef}
          registerUser={registerUser}
        />
      </div>
    </div>
  );
};

export default Register;
