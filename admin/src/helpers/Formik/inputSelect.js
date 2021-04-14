import React from "react";
import { Field } from "formik";

export const InputSelect = ({ name, touched, errors, multiple, children }) => {
  return (
    <React.Fragment>
      <Field
        name={name}
        className={
          touched[name] && errors[name]
            ? "form-control is-invalid"
            : "form-control"
        }
        as="select"
        multiple={multiple}
      >
        {children}
      </Field>
      {touched[name] && errors[name] ? (
        <div className="invalid-feedback">{errors[name]}</div>
      ) : null}
    </React.Fragment>
  );
};
