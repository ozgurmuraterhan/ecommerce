import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Row, Col } from "react-bootstrap";

// import Thumb from "@Helpers/Images/ImageUpload/Thumb";

export const ProductCategoryAddForm = ({
  actionsLoading,
  productCategory,
  btnRef,
  saveProductCategory,
}) => {
  let InitialValues;
  if (productCategory) {
    // Initial Values
    InitialValues = {
      name: productCategory.name,
      description: productCategory.description,
      pictureUrl: null,
    };
  } else {
    InitialValues = {
      name: "",
      description: "",
      pictureUrl: null,
    };
  }

  // Validation schema
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
        // initialValues={productCategory}
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
        }) => (
          <Form className="form form-label-right">
            <Row className="mt-3">
              <Col>
                <div className="form-group">
                  <label>Name : </label>
                  <Field
                    name="name"
                    placeholder="productCategory name"
                    label="productCategory name"
                    className="form-control"
                  />
                </div>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <div className="form-group">
                  <label>Description : </label>
                  <Field
                    name="description"
                    as="textarea"
                    className="form-control"
                  />
                </div>
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
              <Col>{/* <Thumb file={values.pictureUrl} /> */}</Col>
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
