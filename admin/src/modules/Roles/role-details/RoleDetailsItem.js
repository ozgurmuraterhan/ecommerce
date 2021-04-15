import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import url from "@Helpers/api/url.json";

export const RoleDetailsItem = ({
  actionsLoading,
  roleForDetails,
  editRoleHandler,
  deleteRoleHandler,
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
              <Card.Body>
                <Card.Title>{roleForDetails?.name}</Card.Title>
                <Card.Text>{roleForDetails?.description}</Card.Text>
              </Card.Body>
              <Card.Body>
                <Card.Link href={`/role/edit/${roleForDetails?.id}`}>
                  Edit
                </Card.Link>
                <Card.Link
                  onClick={() => deleteRoleHandler(roleForDetails?.id)}
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
                  onClick={() => editRoleHandler(roleForDetails._id)}
                >
                  Edit Role
                </button>
              </ListGroupItem>
              <ListGroupItem>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteRoleHandler(roleForDetails._id)}
                >
                  Delete Role
                </button>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </React.Fragment>
      )}
    </Row>
  );
};
