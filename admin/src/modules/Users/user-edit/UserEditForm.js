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

export const UserEditForm = ({ roles, user, btnRef, saveUser }) => {
  let InitialValues;
  if (user) {
    InitialValues = {
      id: user._id,
      username: user.username,
      preImages: user.avatar,
      isActive: user.isActive,
      avatar: null,
      roleId: {
        label: user.role?.name,
        value: user.role?.id,
      },
    };
  } else {
    InitialValues = {
      id: undefined,
      username: "",
      isActive: false,
      avatar: null,
      roleId: {
        label: "",
        value: "",
      },
    };
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string()
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
          saveUser(values);
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
                <label> User Current Image </label>
                {values.preImages && values.preImages.length > 0 ? (
                  <React.Fragment>
                    <Row className="mt-3">
                      <Col xs={12} sm={6} md={4} lg={4} xl={4}>
                        <img
                          src={`${url.myBaseUrl}/avatars/${values.preImages}`}
                          alt={user.name}
                          title={user.name}
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
                <InputText
                  name="username"
                  label="Username"
                  touched={touched}
                  errors={errors}
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <div className="form-group">
                  <label>Role </label>
                  <FormikReactSelect
                    name="roleId"
                    id="roleId"
                    defaultValue={{
                      label: values.roleId.name,
                      value: values.roleId._id,
                    }}
                    value={values.roleId}
                    options={
                      roles &&
                      roles.map((item) => {
                        return { label: item.name, value: item._id };
                      })
                    }
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    className={`${errors.roleId ? "is-invalid" : ""}`}
                  />
                  {touched.roleId && errors.roleId ? (
                    <div className="invalid-feedback">{errors.roleId}</div>
                  ) : null}
                </div>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col>
                <div className="form-group">
                  <label htmlFor="avatar"> Add User Picture </label>
                  <br />
                  <input
                    id="avatar"
                    name="avatar"
                    type="file"
                    onChange={(event) => {
                      setFieldValue("avatar", event.currentTarget.files[0]);
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
                <Thumb file={values.avatar} />
              </Col>
            </Row>

            <Row>
              <Col>
                <InputTrueFalse
                  name="isActive"
                  label="is Active"
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
