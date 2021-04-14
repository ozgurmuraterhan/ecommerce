import React from "react";
import { Field } from "formik";

export const InputTrueFalse = ({ name, label, touched, errors }) => {
  return (
    <div className="form-group">
      <div className="form-check">
        <Field
          name={name}
          className={
            touched[name] && errors[name]
              ? "form-check-input is-invalid"
              : "form-check-input"
          }
          type="checkbox"
          id={name}
        />
        <label className="form-check-label" htmlFor={name}>
          {label}
        </label>
        {touched[name] && errors[name] ? (
          <div className="invalid-feedback">{errors[name]}</div>
        ) : null}
      </div>
    </div>
  );
};
