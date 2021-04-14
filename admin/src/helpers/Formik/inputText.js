import React from "react";
import { Field } from "formik";

export const InputText = ({ name, label, touched, errors }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Field
        name={name}
        className={
          touched[name] && errors[name]
            ? "form-control is-invalid"
            : "form-control"
        }
        type="text"
      />
      {touched[name] && errors[name] ? (
        <div className="invalid-feedback">{errors[name]}</div>
      ) : null}
    </div>
  );
};
