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
  Form,
  ListGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";
import { Link } from "react-router-dom";

export function ProductCards() {
  const dispatch = useDispatch();
  const { products, isLoading, errors } = useSelector(
    (store) => store.productSlice
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  const getStockStatus = (quantity) => {
    return parseInt(quantity) > 0 ? "success" : "danger";
  };

  // Extract unique categories from products
  const categories = ["All", ...new Set(products.map((product) => product.category))];

  // Filter products based on search term & selected category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
    <div className=" container-fluid my-5">
      <Row>
        {/* Sidebar Filter */}
        <Col lg={2} className="border border-end-1 pt-5">
          {/* <Card className="p-3 shadow-sm"> */}
            <h5 className="mb-3 text-primary">Filter by Category</h5>
            <ListGroup>
              {categories.map((category, index) => (
                <ListGroup.Item
                  key={index}
                  active={selectedCategory === category}
                  action
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </ListGroup.Item>
              ))}
            </ListGroup>
          {/* </Card> */}
        </Col>

        {/* Main Content */}
        <Col lg={10}>
          {/* Search Bar */}
          <Form className="mb-4">
            <Form.Control
              type="text"
              placeholder="Search for a product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>

          {/* Products List */}
          <Row className="g-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Card className="h-100 product-card border-0">
                    <div className="img-wrapper position-relative overflow-hidden">
                      <Card.Img
                        variant="top"
                        src={product.img}
                        alt={product.name}
                        className="product-image p-3"
                      />
                    </div>

                    <Card.Body className="d-flex flex-column">
                      <Badge bg={getStockStatus(product.quantity)}>
                        {parseInt(product.quantity) > 0 ? "IN STOCK" : "OUT OF STOCK"}
                      </Badge>

                      <Card.Title className="h6 my-2">{product.name}</Card.Title>
                      <Card.Text className="text-muted small">
                        Category: {product.category}
                      </Card.Text>

                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <span className="h5 mb-0">${product.price}</span>

                        <Button
                          variant={parseInt(product.quantity) === 0 ? "outline-danger" : "outline-success"}
                          disabled={parseInt(product.quantity) === 0}
                          onClick={() => dispatch(addToCart(product))}
                        >
                          {parseInt(product.quantity) === 0 ? "Out of Stock" : "Add to Cart"}
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col>
                <p className="text-center text-muted">No products found.</p>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
