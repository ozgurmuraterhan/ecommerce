import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Row, Col } from "react-bootstrap";
import { InputText, InputTextArea, InputTrueFalse } from "@Helpers/Formik";
import Thumb from "@Helpers/Images/ImageUpload/Thumb";

export const ProductCategoryAddForm = ({
  productCategory,
  btnRef,
  saveProductCategory,
}) => {
  const InitialValues = {
    name: "",
    description: "",
    isPublished: false,
    pictureUrl: null,
  };

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
          saveProductCategory(values);
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

            <Row className="mt-3">
              <Col>
                <div className="form-group">
                  <label htmlFor="pictureUrl">
                    {" "}
                    Add ProductCategory Picture{" "}
                  </label>
                  <br />
                  <input
                    id="pictureUrl"
                    name="pictureUrl"
                    type="file"
                    onChange={(event) => {
                      setFieldValue("pictureUrl", event.currentTarget.files[0]);
                    }}
                    style={{ width: "100%" }}
                  />
                  <br />
                  <small className="form-text text-muted">
                    formats : .jpg / .jpeg / .png
                  </small>
                </div>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <Thumb file={values.pictureUrl} />
              </Col>
            </Row>

            <Row>
              <Col>
                <InputTrueFalse
                  name="isPublished"
                  label="is Published"
                  touched={touched}
                  errors={errors}
                />
              </Col>
            </Row>

            <button
              type="submit"
              style={{ display: "none" }}
              ref={btnRef}
              onSubmit={() => handleSubmit()}
            ></button>
          </Form>
        )}
      </Formik>
    </>
  );
};
