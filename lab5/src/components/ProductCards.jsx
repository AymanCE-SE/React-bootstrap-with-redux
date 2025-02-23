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
  InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsAction } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";

export function ProductCards() {
  const dispatch = useDispatch();
  const { products, isLoading, errors } = useSelector(
    (store) => store.productSlice
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favoriteProducts, setFavoriteProducts] = useState({});

  useEffect(() => {
    dispatch(getAllProductsAction());
  }, [dispatch]);

  const getStockStatus = (quantity) => {
    return parseInt(quantity) > 0 ? "success" : "danger";
  };

  const categories = ["All", ...new Set(products.map((product) => product.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (productId) => {
    setFavoriteProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
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
    <Container className="py-4">
      <Row>
        {/* Sidebar Filter */}
        <Col lg={3} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="mb-4">
                <InputGroup>
                  <InputGroup.Text className="bg-white border-end-0">
                    <BiSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-start-0 ps-2"
                  />
                </InputGroup>
              </div>

              <h6 className="text-muted mb-3">Categories</h6>
              <ListGroup variant="flush">
                {categories.map((category, index) => (
                  <ListGroup.Item
                    key={index}
                    action
                    className={`border-0 px-0 py-2 ${
                      selectedCategory === category 
                        ? "text-primary fw-semibold"
                        : "text-dark"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                    <Badge 
                      bg={selectedCategory === category ? "primary" : "light"}
                      text={selectedCategory === category ? "white" : "dark"}
                      className="float-end"
                    >
                      {products.filter(p => 
                        category === "All" ? true : p.category === category
                      ).length}
                    </Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Main Content */}
        <Col lg={9}>
          <Row className="g-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Col xs={12} sm={6} md={4} key={product.id}>
                  <Card className="h-100 product-card border-0 shadow-sm">
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
                            className="rounded-circle p-2 border"
                            onClick={() => toggleFavorite(product.id)}
                          >
                            <i className={`bi ${favoriteProducts[product.id] ? "bi-heart-fill text-danger" : "bi-heart text-dark"} fs-5`}></i>
                          </Button>
                          <Button
                            variant="light"
                            size="sm"
                            className="rounded-circle p-2 border"
                          >
                            <Link to={`products/${product.id}`} className="text-dark">
                              <i className="bi bi-eye fs-5"></i>
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Card.Body className="d-flex flex-column">
                      <Badge bg={getStockStatus(product.quantity)} className="w-auto mb-2 p-2">
                        {parseInt(product.quantity) > 0 ? "IN STOCK" : "OUT OF STOCK"}
                      </Badge>

                      <Card.Title className="h6 mb-1">{product.name}</Card.Title>
                      <Card.Text className="text-muted small mb-3">
                        {product.category}
                      </Card.Text>

                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <span className="h5 mb-0">${product.price}</span>

                        <Button
                          variant={parseInt(product.quantity) === 0 ? "outline-danger" : "outline-success"}
                          disabled={parseInt(product.quantity) === 0}
                          onClick={() => dispatch(addToCart(product))}
                          size="sm"
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
                <Card className="text-center p-4 border-0 shadow-sm">
                  <p className="text-muted mb-0">No products found.</p>
                </Card>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}