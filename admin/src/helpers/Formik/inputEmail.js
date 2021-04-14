import React from "react";
import { Field } from "formik";

export const InputEmail = ({ name, touched, errors }) => {
  return (
    <React.Fragment>
      <Field
        name={name}
        className={
          touched[name] && errors[name]
            ? "form-control is-invalid"
            : "form-control"
        }
        type="email"
      />
      {touched[name] && errors[name] ? (
        <div className="invalid-feedback">{errors[name]}</div>
      ) : null}
    </React.Fragment>
  );
};
