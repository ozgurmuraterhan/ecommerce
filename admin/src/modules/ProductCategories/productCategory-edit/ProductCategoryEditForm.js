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
// import FormikReactSelect from "../../../../../_helpers/Formik/FormikReactSelect";
// import config from "../../../../../_services/config.json";
// import Thumb from "@Helpers/Images/ImageUpload/Thumb";

export const ProductCategoryEditForm = ({
  actionsLoading,
  productCategory,
  btnRef,
  saveProductCategory,
}) => {
  let InitialValues;
  if (productCategory) {
    // Initial Values
    InitialValues = {
      id: productCategory._id,
      name: productCategory.name,
      description: productCategory.description,
      preImages: productCategory.pictureUrl,
      pictureUrl: null,
    };
  } else {
    InitialValues = {
      id: undefined,
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
            <Row>
              <Col>
                <label> ProductCategory Current Image </label>
                {values.preImages && values.preImages.length > 0 ? (
                  <React.Fragment>
                    <Row className="mt-3">
                      <Col xs={12} sm={6} md={4} lg={4} xl={4}>
                        <img
                          src={`${url.myBaseUrl}/productCategories/${values.preImages}`}
                          alt={productCategory.name}
                          title={productCategory.name}
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
