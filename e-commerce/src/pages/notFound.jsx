import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

export function NotFound(){
  return (
    <Container className="text-center my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="display-1 text-danger fw-bold">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="text-muted mb-4">
            The page you are looking for might have been removed or is temporarily unavailable.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

