/** @format */

import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { getAllProducts } from "../api/productapi";

export function ProductCards() {
  let [products, setProducts] = useState([]);
  let [errors, setErrors] = useState(null);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let response = await getAllProducts();
        setProducts(response.data); // setting the data in products state
        setIsLoading(false);
      } catch (error) {
        setErrors(error);
        setIsLoading(false);
      }
    };
    fetchProducts(); // calling the function
  }, []);

  return (
    <>
    <Container className="my-5">
  <Row className="gy-5">  
    {products.map((product) => (
      <Col xs={12} md={3} key={product.id}>
        <Card className="h-100 shadow-sm d-flex flex-column">
          <Card.Img
            variant="top"
            src={product.img}
            alt="Product Image"
            className="product-image p-3"
            style={{ height: "180px",width: "85%",   margin: "auto" }}
          />

          <Card.Body className="p-2 d-flex flex-column align-items-center">
            <Card.Title className="fw-bold text-center p-2 mb-2">{product.name}</Card.Title>
            <Card.Text className="text-center p-2" style={{ fontSize: "14px", minHeight: "60px" }}>
              {product.description || "Lorem ipsum dolor sit amet consectetur adipisicing elit..."}
            </Card.Text>
            <div className="btn btn-outline-success w-75 fw-bold text-center mt-auto mb-1">
              Add To Cart
            </div>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>

    </>
  );
}
