/** @format */

import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Badge,
  Spinner,
} from "react-bootstrap";
import { getAllProducts } from "../api/productapi";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../store/productSlice";
import { Link } from "react-router-dom";

export function ProductCards() {
  const dispatchAction = useDispatch();
  const { products, isLoading, errors } = useSelector(
    (store) => store.productSlice
  );

  useEffect(() => {
    dispatchAction(getAllProductsAction());
  }, []);

  const getStockStatus = (quantity) => {
    return parseInt(quantity) > 0 ? "success" : "danger";
  };

  if (isLoading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (errors) {
    return (
      <Container className="my-5">
        <div className="alert alert-danger">
          Error loading products. Please try again later.
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="g-4">
        {products.map((product) => (
          <Col xs={12} sm={6} md={3} key={product.id}>
            <Card className="h-100 product-card border-0">
              <div className="img-wrapper position-relative overflow-hidden">
                <Card.Img
                  variant="top"
                  src={product.img}
                  alt={product.name}
                  className="product-image p-3"
                />
                <div className="hover-overlay position-absolute top-0 start-0 w-100 h-100">
                  <div className="quick-actions d-flex justify-content-center align-items-center h-100 gap-2">
                    <Button
                      variant="light"
                      size="sm"
                      className="rounded-circle p-2">
                      <i className="bi bi-heart fs-5 "></i>
                    </Button>
                    <Button
                      variant="light"
                      size="sm"
                      className="rounded-circle p-2">
                      <Link to={`products/${product.id}`}>
                        <i className="bi bi-eye fs-5"></i>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              <Card.Body className="d-flex flex-column">
                <div className="mb-2">
                  <Badge bg={getStockStatus(product.quantity)}>
                    {parseInt(product.quantity) > 0
                      ? "IN STOCK"
                      : "OUT OF STOCK"}
                  </Badge>
                </div>

                <Card.Title className="h6 mb-2">{product.name}</Card.Title>

                <Card.Text className="text-muted small mb-2">
                  Category: {product.category}
                </Card.Text>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <span className="h5 mb-0">${product.price}</span>
                  <Button
                    variant="primary"
                    className="add-to-cart-btn"
                    disabled={parseInt(product.quantity) === 0}>
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
