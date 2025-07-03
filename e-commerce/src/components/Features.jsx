import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaBoxes, FaTruck, FaShieldAlt } from "react-icons/fa";
import { LuZap } from "react-icons/lu";

const FeatureCards = () => {
  const features = [
    { icon: <FaBoxes size={40} />, title: "Product Packing", text: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
    { icon: <LuZap size={40} />, title: "24X7 Support", text: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
    { icon: <FaTruck size={40} />, title: "Delivery in 5 Days", text: "Lorem ipsum dolor sit amet, consectetur adipiscing" },
    { icon: <FaShieldAlt size={40} />, title: "Payment Secure", text: "Lorem ipsum dolor sit amet, consectetur adipiscing" }
  ];

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        {features.map((feature, index) => (
          <Col md={3} key={index} className="p-3">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="text-center p-4 bg-light">
                <div className="mb-3">{feature.icon}</div>
                <Card.Title>{feature.title}</Card.Title>
                <Card.Text className="text-muted small">{feature.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeatureCards;
