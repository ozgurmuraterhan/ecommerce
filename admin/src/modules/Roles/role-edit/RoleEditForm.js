import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Row, Col } from "react-bootstrap";
import url from "@Helpers/api/url.json";
import {
  InputText,
  InputTextArea,
  InputNumber,
  FormikReactSelect,
  InputTrueFalse,
} from "@Helpers/Formik";
import Thumb from "@Helpers/Images/ImageUpload/Thumb";

export const RoleEditForm = ({ role, btnRef, saveRole }) => {
  let InitialValues;
  if (role) {
    InitialValues = {
      id: role._id,
      name: role.name,
      description: role.description,
    };
  } else {
    InitialValues = {
      id: undefined,
      name: "",
      description: "",
    };
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "minimum 3 character")
      .max(100, "maximum 100 character")
      .required("this field is required"),
    description: Yup.string()
      .min(3, "minimum 3 character")
      .max(100, "maximum 100 character")
      .required("this field is required"),
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={InitialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          saveRole(values);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          status,
          touched,
          handleBlur,
          isSubmitting,
        }) => (
          <Form className="form form-label-right">
            <Row className="mt-3">
              <Col>
                <InputText
                  name="name"
                  label="Name"
                  touched={touched}
                  errors={errors}
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <InputTextArea
                  name="description"
                  label="Description"
                  touched={touched}
                  errors={errors}
                  rows={3}
                  cols={10}
                />
              </Col>
            </Row>

            <button
              type="submit"
              style={{ display: "none" }}
              ref={btnRef}
              onSubmit={() => handleSubmit()}
              disabled={isSubmitting}
            ></button>
          </Form>
        )}
      </Formik>
    </>
  );
};
