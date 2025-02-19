import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col, Badge } from "react-bootstrap";
import { IoArrowBack, IoStarHalf } from "react-icons/io5";
import { IoIosStar } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../store/productSlice";

export function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((store) => store.productSlice);
  const { currentUser } = useSelector((state) => state.userSlice);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getAllProductsAction());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    const foundProduct = products.find((product) => product.id == id);
    setProduct(foundProduct || null);
  }, [products, id]);

  if (isLoading) {
    return <h2 className="text-center alert alert-info">Loading...</h2>;
  }

  if (!product) {
    return <h2 className="text-center text-danger">Product Not Found</h2>;
  }

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-danger text-white border-radius-lg p-4 rounded-top-3 shadow">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="text-white text-capitalize ps-3 mb-0">
                  Product Details
                </h5>
              </div>
            </Card.Header>
            <Card.Body className="p-4">
              <Row>
                <Col className="text-center col-md-4 m-auto">
                  <img
                    src={product.img}
                    alt="Product"
                    id="product-detail"
                    className="img-fluid rounded shadow-sm"
                  />
                </Col>
                <Col md={8}>
                  <div className="product-info">
                    <Row className="mb-4">
                      <Col md={12}>
                        <h3 className="mb-3">{product?.name}</h3>

                        {product?.quantity > 0 ? (
                          <Badge bg="success" className="fs-6 mb-3">
                            IN STOCK
                          </Badge>
                        ) : (
                          <Badge bg="danger" className="fs-6 mb-3">
                            OUT OF STOCK
                          </Badge>
                        )}
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={3} className="text-secondary">
                        Product ID:
                      </Col>
                      <Col md={9}>{product?.id}</Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={3} className="text-secondary">
                        Category:
                      </Col>
                      <Col md={9}>{product?.category || "category A"}</Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={3} className="text-secondary">
                        Price:
                      </Col>
                      <Col md={9} className="text-danger fw-bold">
                        {product?.price}$
                      </Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={3} className="text-secondary">
                        Stock:
                      </Col>
                      <Col md={9}>{product?.quantity} units</Col>
                    </Row>

                    <Row className="mb-3">
                      <Col md={3} className="text-secondary">
                        Rate:
                      </Col>
                      <Col md={9}>
                        <div className="rating fs-5 text-warning align-middle ">
                          <IoIosStar />
                          <IoIosStar />
                          <IoIosStar />
                          <IoIosStar />
                          <IoStarHalf />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div>
        {/* Always show Back To Home button */}
        <Link to="/" className="me-2 btn btn-outline-success fw-bold">
          <IoArrowBack className="me-1 mb-1" /> Back To Home
        </Link>
        
        {/* Only show admin buttons if currentUser exists and is an admin */}
        {currentUser?.role === "admin" && (
          <>
            <Link
              to={`/products/${id}/edit`}
              className="me-2 btn btn-outline-dark fw-bold">
              Edit Product
            </Link>
            <Link
              to={`/products`}
              className="me-2 btn btn-outline-danger fw-bold">
              To Products Dashboard
            </Link>
          </>
        )}
      </div>
    </Container>
  );
}