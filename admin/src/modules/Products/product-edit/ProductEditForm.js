// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
// import { useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Row, Col } from "react-bootstrap";
import url from "@Helpers/api/url.json";
// import Dropzone from "react-dropzone";
// import { useDropzone } from 'react-dropzone'
// import Thumb from '../../../../../_helpers/Images/Thumb';
// import { Input, Select } from "../../../../../../_metronic/_partials/controls";
// import { MyCheckbox } from "../../../../../_helpers/Formik/Mui_Checkbox";
import { FormikReactSelect } from "@Helpers/Formik";
// import config from "../../../../../_services/config.json";
import Thumb from "@Helpers/Images/ImageUpload/Thumb";

export const ProductEditForm = ({
  actionsLoading,
  product,
  productCategories,
  btnRef,
  saveProduct,
}) => {
  let InitialValues;
  if (product) {
    // Initial Values
    InitialValues = {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      countInStock: product.countInStock,
      preImages: product.pictureUrl,
      pictureUrl: null,
      isPublished: product.isPublished,
      productCategoryId: {
        label: product.category?.name,
        value: product.category?._id,
      },
    };
  } else {
    InitialValues = {
      id: undefined,
      name: "",
      description: "",
      price: "",
      countInStock: "",
      pictureUrl: null,
      isPublished: false,
      productCategoryId: "",
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
            <Row>
              <Col>
                <label> Product Current Image </label>
                {values.preImages && values.preImages.length > 0 ? (
                  <React.Fragment>
                    <Row className="mt-3">
                      <Col xs={12} sm={6} md={4} lg={4} xl={4}>
                        <img
                          src={`${url.myBaseUrl}/products/${values.preImages}`}
                          alt={product.name}
                          title={product.name}
                          style={{ maxWidth: "100%" }}
                          className="img-thumbnail"
                        />
                      </Col>
                    </Row>
                  </React.Fragment>
                ) : (
                  <p>عکسی برای محصول انتخاب نشده است.</p>
                )}
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <div className="form-group">
                  <label>category : </label>
                  <FormikReactSelect
                    name="productCategoryId"
                    id="productCategoryId"
                    defaultValue={{
                      label: values.productCategoryId?.name,
                      value: values.productCategoryId?._id,
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
                  {errors.productCategoryId ? (
                    <div className="invalid-feedback">
                      {errors.productCategoryId}
                    </div>
                  ) : (
                    ""
                  )}
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
