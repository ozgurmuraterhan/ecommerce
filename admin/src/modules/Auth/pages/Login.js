import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as auth from "@Redux/auth/authRedux";
import { login } from "@Redux/auth/authCrud";

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  username: "",
  password: "",
};

function Login(props) {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "حداقل 3 کاراکتر وارد کنید")
      .max(50, "نمی توانید بیشتر از 50 کاراکتر وارد کنید")
      .required("Please enter username"),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Please enter password"),
  });

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      setTimeout(() => {
        login(values.username, values.password)
          .then((response) => {
            const loggedInUserInfo = response.data.data;
            disableLoading();
            props.login(loggedInUserInfo);
          })
          .catch(() => {
            disableLoading();
            setSubmitting(false);
            setStatus(
              intl.formatMessage({
                id: "AUTH.VALIDATION.LOGIN_FAILED",
              })
            );
          });
      }, 1000);
    },
  });

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">Login Account</h3>
        <p className="text-muted font-weight-bold">
          Please enter username and password
        </p>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        {formik.status ? (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{formik.status}</div>
          </div>
        ) : (
          <div className="mb-10 alert alert-custom alert-light-info alert-dismissible">
            <div className="alert-text ">
              لطفا برای ورود <strong>نام کاربری</strong> و{" "}
              <strong>کلمه عبور</strong> خود را وارد کنید.
            </div>
          </div>
        )}

        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="نام کاربری"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "username"
            )}`}
            name="username"
            autoComplete="off"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.username}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group fv-plugins-icon-container">
          <input
            placeholder="کلمه عبور"
            type="password"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              "password"
            )}`}
            name="password"
            autocomplete="off"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.password}</div>
            </div>
          ) : null}
        </div>
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <span>در صورت فراموشی کلمه عبور با مدیریت سایت تماس بگیرید.</span>
          {/* <Link
            to="/auth/forgot-password"
            className="text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot"
          >
            Forgot Password
          </Link> */}
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={formik.isSubmitting}
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>Sign In</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
    </div>
  );
}

export default connect(null, auth.actions)(Login);
