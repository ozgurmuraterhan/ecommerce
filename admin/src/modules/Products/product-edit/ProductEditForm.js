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

export const ProductEditForm = ({
  product,
  productCategories,
  btnRef,
  saveProduct,
}) => {
  let InitialValues;
  if (product) {
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
          isSubmitting,
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
                  <p>???????? ???????? ?????????? ???????????? ???????? ??????.</p>
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
                <InputNumber
                  name="price"
                  label="Price"
                  touched={touched}
                  errors={errors}
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <InputNumber
                  name="countInStock"
                  label="count in stock"
                  touched={touched}
                  errors={errors}
                />
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
              disabled={isSubmitting}
            ></button>
          </Form>
        )}
      </Formik>
    </>
  );
};
