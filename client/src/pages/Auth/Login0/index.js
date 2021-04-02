import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";

const Login = () => {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.replace("/");
    }
  }, []);

  const {
    values,
    handleSubmit,
    submitCount,
    getFieldProps,
    setValues,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit(values) {
      const data = {
        username: values.username,
        password: values.password,
      };
      axios
        .post("http://localhost:8000/api/v1/login", data)
        .then((response) => {
          console.log(response);
          localStorage.setItem("token", response.headers["x-auth-token"]);
          history.replace("/");
        })
        .catch((error) => {
          console.log(error);
          alert("some problem !!!");
        });
    },
  });

  return (
    <div className="container">
      <div>
        <h4>Login</h4>
      </div>
      <div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="username">username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              {...getFieldProps("username")}
            />
            <small id="username" className="form-text text-muted">
              insert username
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="password">password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              {...getFieldProps("password")}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
