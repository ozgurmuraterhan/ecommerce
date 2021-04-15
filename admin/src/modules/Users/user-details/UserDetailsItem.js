import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import url from "@Helpers/api/url.json";

export const UserDetailsItem = ({
  actionsLoading,
  userForDetails,
  editUserHandler,
  deleteUserHandler,
}) => {
  return (
    <Row className="my-3">
      {actionsLoading ? (
        <Col className="text-center">
          <h6>Please wait...</h6>
        </Col>
      ) : (
        <React.Fragment>
          <Col xs={12} sm={12} md={6} lg={6} xl={6} className="mb-3 px-2">
            <Card>
              <Link to={`/user/${userForDetails?.id}`}>
                <Card.Img
                  variant="top"
                  src={`${url.myBaseUrl}/avatars/${userForDetails?.avatar}`}
                  alt={userForDetails?.username}
                  title={userForDetails?.username}
                />
              </Link>
              <Card.Body>
                <Link to={`/user/${userForDetails?.id}`}>
                  <Card.Title>{userForDetails?.username}</Card.Title>
                </Link>
                <Link to={`/userCategory/${userForDetails?.id}`}>
                  {/* <Card.Text className="text-muted">{`${userForDetails?.category?.name}`}</Card.Text> */}
                  <Card.Text className="text-muted">{`${userForDetails?.role}`}</Card.Text>
                </Link>
                <Card.Text>user description</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  {userForDetails?.isActive ? "Active" : "Deactive"}
                </ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Card.Link href={`/user/edit/${userForDetails?.id}`}>
                  Edit
                </Card.Link>
                <Card.Link
                  onClick={() => deleteUserHandler(userForDetails?.id)}
                >
                  Delete
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} xl={6} className="mb-3">
            <ListGroup>
              <ListGroupItem>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => editUserHandler(userForDetails._id)}
                >
                  Edit User
                </button>
              </ListGroupItem>
              <ListGroupItem>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteUserHandler(userForDetails._id)}
                >
                  Delete User
                </button>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </React.Fragment>
      )}
    </Row>
  );
};
