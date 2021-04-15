import React from "react";
import { Link } from "react-router-dom";
import { Col, Card } from "react-bootstrap";

const RoleItem = ({ id, name, description, deleteRoleHandler }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} xl={3} className="mb-3 px-2">
      <Card>
        <Card.Body>
          <Link to={`/role/${id}`}>
            <Card.Title className="mb-0">{name}</Card.Title>
          </Link>
          <Card.Text className="mt-2">{description}</Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Link href={`/role/edit/${id}`}>Edit</Card.Link>
          <Card.Link onClick={() => deleteRoleHandler(id)}>Delete</Card.Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RoleItem;
