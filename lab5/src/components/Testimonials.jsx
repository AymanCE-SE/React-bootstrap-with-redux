import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const testimonials = [
  {
    id: 1,
    name: "Stephen Smith",
    role: "Co Founder",
    image: "./src/assets/1.jpg.png",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    name: "Lorem Robinson",
    role: "Manager",
    image: "./src/assets/2.jpg.png",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    name: "Saddika Alard",
    role: "Team Leader",
    image: "./src/assets/3.jpg.png",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const TestimonialsSection = () => {
  return (
    <Container className="my-5">
      <div className="text-center my-5">
        <h2>Great Words From People</h2>
        <p className="text-secondary col-md-5 mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse totam
          aliquid nemo ex perspiciat
        </p>
      </div>

      <Row>
        {testimonials.map((testimonial) => (
          <Col md={4} key={testimonial.id}>
            <Card className="text-center p-4 shadow-sm border-0">
              <Card.Img
                variant="top"
                src={testimonial.image}
                alt={testimonial.name}
                className="testimonial-img mx-auto"
                style={{ width: "80px", borderRadius: "50%" }}
              />
              <Card.Body>
                <Card.Title className="fw-bold mt-3">{testimonial.name}</Card.Title>
                <Card.Subtitle className="text-muted small mb-2">{testimonial.role}</Card.Subtitle>
                <Card.Text className=" text-muted small">"{testimonial.quote}"</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TestimonialsSection;
