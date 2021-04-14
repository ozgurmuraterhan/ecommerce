import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Row, Col } from "react-bootstrap";
import { FormikReactSelect } from "@Helpers/Formik";
import Thumb from "@Helpers/Images/ImageUpload/Thumb";

export const ProductAddForm = ({
  actionsLoading,
  productCategories,
  btnRef,
  saveProduct,
}) => {
  const InitialValues = {
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    pictureUrl: null,
    isPublished: false,
    productCategoryId: {
      label: "",
      value: "",
    },
  };

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
    price: Yup.number()
      .min(0, "minimum = 0")
      .required("this field is required"),
    countInStock: Yup.number()
      .min(0, "minimum = 0")
      .required("this field is required"),
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={InitialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          saveProduct(values);
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
                <div className="form-group">
                  <label>category : </label>
                  <FormikReactSelect
                    name="productCategoryId"
                    id="productCategoryId"
                    defaultValue={{
                      label: values.productCategoryId.name,
                      value: values.productCategoryId._id,
                    }}
                    value={values.productCategoryId}
                    options={
                      productCategories &&
                      productCategories.map((item) => {
                        return { label: item.name, value: item._id };
                      })
                    }
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    className={`${
                      errors.productCategoryId ? "is-invalid" : ""
                    }`}
                  />
                  {touched.productCategoryId && errors.productCategoryId ? (
                    <div className="invalid-feedback">
                      {errors.productCategoryId}
                    </div>
                  ) : null}
                </div>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <div className="form-group">
                  <label htmlFor="name">Name :</label>
                  <Field
                    name="name"
                    className={
                      touched.name && errors.name
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    type="text"
                  />
                  {touched.name && errors.name ? (
                    <div className="invalid-feedback">{errors.name}</div>
                  ) : null}
                </div>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <div className="form-group">
                  <label htmlFor="description">Description :</label>
                  <Field
                    name="description"
                    className={
                      touched.description && errors.description
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    as="textarea"
                    rows={3}
                    cols={10}
                  />
                  {touched.description && errors.description ? (
                    <div className="invalid-feedback">{errors.description}</div>
                  ) : null}
                </div>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <div className="form-group">
                  <label htmlFor="price">Price :</label>
                  <Field
                    name="price"
                    className={
                      touched.price && errors.price
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    type="number"
                  />
                  {touched.price && errors.price ? (
                    <div className="invalid-feedback">{errors.price}</div>
                  ) : null}
                </div>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <div className="form-group">
                  <label htmlFor="countInStock">count in stock :</label>
                  <Field
                    name="countInStock"
                    className={
                      touched.countInStock && errors.countInStock
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    type="number"
                  />
                  {touched.countInStock && errors.countInStock ? (
                    <div className="invalid-feedback">
                      {errors.countInStock}
                    </div>
                  ) : null}
                </div>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <div className="form-group">
                  <label htmlFor="pictureUrl"> Add Product Picture </label>
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
                    allowed formats : .jpg / .jpeg / .png
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
                <div class="form-check">
                  <Field
                    name="isPublished"
                    id="isPublished"
                    className="form-check-input"
                    type="checkbox"
                  />
                  <label className="form-check-label" htmlFor="isPublished">
                    isPublished
                  </label>
                </div>
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
