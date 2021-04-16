import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import * as auth from "@Redux/auth/authRedux";
import { login } from "@Redux/auth/authCrud";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
// import * as actions from "@Redux/products/productsActions";
import { Container, Row, Col, Card } from "react-bootstrap";
import { LoginForm } from "./LoginForm";

const Login = (props) => {
  const [loading, setLoading] = useState(false);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const loginHandler = async (values) => {
    try {
      enableLoading();
      const response = await login(values.username, values.password);
      const loggedInUserInfo = await response.data.data;
      if (response.status === 200) {
        // alert --> success
      } else {
        // alert --> danger
      }
      disableLoading();
      props.login(loggedInUserInfo);
    } catch (error) {
      console.error(error);
      // alert --> danger
      disableLoading();
    }
  };

  const btnRef = useRef();
  const loginClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Header
              as="h5"
              className="bg-white d-flex justify-content-between align-items-center"
            >
              <div>Login</div>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <Row>
                  <Col className="text-center">
                    <h6>Please wait...</h6>
                  </Col>
                </Row>
              ) : (
                <LoginForm btnRef={btnRef} login={loginHandler} />
              )}
            </Card.Body>
            <Card.Footer>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={loginClick}
                disabled={loading}
              >
                {loading ? "Please wait..." : "Login"}
              </button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default connect(null, auth.actions)(Login);
