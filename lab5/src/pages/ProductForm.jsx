/** @format */

import React, { useEffect, useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { addNewProduct, editProduct, getProductById } from "../api/productapi";
import { useNavigate, useParams } from "react-router-dom";

export function ProductForm() {
  const navigate = useNavigate(); //to navigate after submit button
  const { id } = useParams(); //for edit case
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    img: "",
  });

  useEffect(() => {
    if (id != 0) {
      // for edit case & restore data of the editing product
      getProductById(id)
        .then((response) => {
          setFormData(response.data);
          // console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  // prepare input data before send
  // e.target => pickes the input element
  // e.target.value => pickes the input adding value
  // e.target.name => pickes the input name which equals to the formData
  const inputHandler = (e) => {
    console.log(e.target);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // on form submit
  const productHandler = async (e) => {
    e.preventDefault();
    // for adding new product condition
    if (id == 0) {
      await addNewProduct(formData);
    } else {
      await editProduct(id, formData); // for edit product condition sending it
    }
    navigate("/products");
  };
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-danger text-white border-radius-lg p-4 rounded-top-3 shadow">
              <h5 className="text-white text-capitalize ps-3 mb-0">
                {id == 0 ? "Add New Product" : "Edit Product"}
              </h5>
            </Card.Header>
            <Card.Body className="p-4">
              <Form onSubmit={productHandler}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter product name"
                        name="name"
                        value={formData.name}
                        onChange={inputHandler}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type="text"
                        name="category"
                        placeholder="Enter category"
                        value={formData.category}
                        onChange={inputHandler}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={inputHandler}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter stock quantity"
                        value={formData.quantity}
                        onChange={inputHandler}
                        name="quantity"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3  ">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        name="status"
                        value={formData.status}
                        onChange={inputHandler}>
                        <option value="">Select status</option>
                        <option value="IN STOCK">IN STOCK</option>
                        <option value="OUT OF STOCK">OUT OF STOCK</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Product URL </Form.Label>
                      <Form.Control
                        type="url"
                        name="img"
                        value={formData.img}
                        placeholder="Add the product image URL"
                        onChange={inputHandler}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <Link
                    to="/products"
                    className="me-2 btn btn-outline-danger fw-bold">
                    Cancel
                  </Link>
                  <Button variant="success" type="submit">
                    {id == 0 ? "Add New Product" : "Edit Product"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
