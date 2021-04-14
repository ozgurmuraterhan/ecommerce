import React from "react";
import { Formik, Form, Field } from "formik";
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

export const ProductCategoryEditForm = ({
  productCategory,
  btnRef,
  saveProductCategory,
}) => {
  let InitialValues;
  if (productCategory) {
    InitialValues = {
      id: productCategory._id,
      name: productCategory.name,
      description: productCategory.description,
      isPublished: productCategory.isPublished,
      preImages: productCategory.pictureUrl,
      pictureUrl: null,
    };
  } else {
    InitialValues = {
      id: undefined,
      name: "",
      description: "",
      isPublished: false,
      pictureUrl: null,
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
                  <p>عکسی برای دسته بندی انتخاب نشده است.</p>
                )}
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <InputText
                  name="name"
                  label="Name"
                  touched={touched}
                  errors={errors}
                />
                {/* <div className="form-group">
                  <label>Name : </label>
                  <Field
                    name="name"
                    placeholder="productCategory name"
                    label="productCategory name"
                    className="form-control"
                  />
                </div> */}
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
                {/* <div className="form-group">
                  <label>Description : </label>
                  <Field
                    name="description"
                    as="textarea"
                    className="form-control"
                  />
                </div> */}
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
