// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Thumb from "../../../_helpers/Images/ImageUpload/Thumb";

export const RegisterForm = ({ user, btnRef, registerUser }) => {
  // Validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "minimum 3 characters")
      .max(100, "maximum 100 characters")
      .required("please insert username"),
    password: Yup.string()
      .min(3, "minimum 3 characters")
      .max(100, "maximum 100 characters")
      .required("please insert password"),
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          registerUser(values);
        }}
      >
        {({ values, errors, handleSubmit, setFieldValue, setFieldTouched }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <label>username</label>
                <Field
                  name="username"
                  className="form-control"
                  placeholder="username"
                  label="username"
                  autoFocus={true}
                />
              </div>

              <div className="form-group row">
                <label>password</label>
                <Field
                  name="password"
                  className="form-control"
                  placeholder="password"
                  label="password"
                  autoFocus={true}
                  type="password"
                />
              </div>

              <div className="form-group row">
                <label for="avatar">Add user avatar</label>
                <br />
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  onChange={(event) => {
                    setFieldValue("avatar", event.currentTarget.files[0]);
                  }}
                  style={{ width: "100%" }}
                />
                <br />
                <Thumb file={values.avatar} />
              </div>

              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};
