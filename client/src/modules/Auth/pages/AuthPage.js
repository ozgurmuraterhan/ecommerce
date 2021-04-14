/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Route } from "react-router-dom";
import { Link, Switch, Redirect } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";

export function AuthPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/*begin::Login*/}
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
          id="kt_login"
        >
          {/*begin::Aside*/}
          <div
            className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={{
              backgroundImage: `url("/media/bg/bg-1.jpg")`,
            }}
          >
            {/*begin: Aside Container*/}
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              {/* start:: Aside header */}
              <Link to="/" className="flex-column-auto mt-5">
                <img
                  alt="Logo"
                  className="max-h-150px"
                  src="/media/logos/logo-daliran002.png"
                />
              </Link>
              {/* end:: Aside header */}

              {/* start:: Aside content */}
              <div className="flex-column-fluid d-flex flex-column justify-content-center">
                <h3 className="font-size-h1 mb-5 text-white">
                  لبنیات دلیران عنصری
                </h3>
                <p className="font-weight-lighter text-white opacity-80">
                  همیشه بهترینیم بخاطر شما
                </p>
              </div>
              {/* end:: Aside content */}

              {/* start:: Aside footer for desktop */}
              <div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">
                <div className="opacity-70 font-weight-bold	text-white">
                  پشتیبانی : 09059982746
                </div>
                <div className="d-flex">
                  <a
                    href="http://www.dalirangroup.com/"
                    className="text-white ml-10"
                    target="_blank"
                    rel="noreferrer"
                  >
                    درباره ما
                  </a>
                </div>
              </div>
              {/* end:: Aside footer for desktop */}
            </div>
            {/*end: Aside Container*/}
          </div>
          {/*begin::Aside*/}

          {/*begin::Content*/}
          <div className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">
            {/* begin::Content body */}
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              <Switch>
                <Route path="/auth/login" component={Login} />
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
            {/*end::Content body*/}

            {/* begin::Mobile footer */}
            <div className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                پشتیبانی : 09059982746
              </div>
              <div className="d-flex order-1 order-sm-2 my-2">
                <a
                  href="http://www.dalirangroup.com/"
                  className="text-white ml-10"
                  target="_blank"
                  rel="noreferrer"
                >
                  درباره ما
                </a>
              </div>
            </div>
            {/* end::Mobile footer */}
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Login*/}
      </div>
    </>
  );
}
