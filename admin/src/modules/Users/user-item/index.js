import React from "react";
import { Link } from "react-router-dom";
import { Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import url from "@Helpers/api/url.json";

const UserItem = ({
  id,
  username,
  role,
  isActive,
  avatar,
  deleteUserHandler,
}) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} xl={3} className="mb-3 px-2">
      <Card>
        <Link to={`/user/${id}`}>
          <Card.Img
            variant="top"
            src={`${url.myBaseUrl}/avatars/${avatar}`}
            alt={username}
            title={username}
          />
        </Link>
        <Card.Body>
          <Link to={`/user/${id}`}>
            <Card.Title className="mb-0">{username}</Card.Title>
          </Link>
          <Link to={`/role/${id}`}>
            <small className="text-muted">{`${role?.name}`}</small>
          </Link>
          <Card.Text className="mt-2">user about</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{isActive ? "Active" : "Deactive"}</ListGroupItem>
        </ListGroup>
        <Card.Body>
          <Card.Link href={`/user/edit/${id}`}>Edit</Card.Link>
          <Card.Link onClick={() => deleteUserHandler(id)}>Delete</Card.Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default UserItem;
