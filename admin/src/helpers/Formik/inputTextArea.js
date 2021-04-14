import React from "react";
import { Field } from "formik";

export const InputTextArea = ({ name, touched, errors, rows, cols }) => {
  return (
    <React.Fragment>
      <Field
        name={name}
        className={
          touched[name] && errors[name]
            ? "form-control is-invalid"
            : "form-control"
        }
        as="textarea"
        rows={rows}
        cols={cols}
      />
      {touched[name] && errors[name] ? (
        <div className="invalid-feedback">{errors[name]}</div>
      ) : null}
    </React.Fragment>
  );
};
