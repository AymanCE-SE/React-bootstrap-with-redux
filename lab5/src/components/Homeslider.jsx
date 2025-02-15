import React from 'react';
import { Container, Carousel, Button } from 'react-bootstrap';

const HomeSlider = () => {
  return (
    <section id='sliderSection' className="slider_section position-relative " style={{ height: '80vh', overflow: 'hidden' }}>
      <div className="slider_bg_box position-relative w-100 h-100">
        <img 
          src="./src/assets/slider-bg.jpg" 
          alt="Background" 
          className="w-100 h-100 object-fit-cover position-absolute top-0 start-0"
          style={{ objectFit: 'cover', height: '80vh' }}
        />
      </div>
      <Carousel id="customCarousel1" className="position-absolute top-50 start-0 translate-middle-y w-100" indicators={false} controls={true}>
        <Carousel.Item>
          <Container>
            <div className="row justify-content-start">
              <div className="col-md-7 col-lg-6">
                <div className="detail-box  p-4  ">
                  <h1>
                    <span>Sale 20% Off</span>
                    <br /> On Everything
                  </h1>
                  <p>
                    Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid
                    error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus
                    repellat modi impedit sequi.
                  </p>
                  <div className="btn-box">
                    <Button variant="primary">Shop Now</Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Carousel.Item>

        <Carousel.Item>
          <Container>
            <div className="row justify-content-start">
              <div className="col-md-7 col-lg-6">
                <div className="detail-box  p-4 ">
                  <h1>
                    <span>Sale 20% Off</span>
                    <br /> On Everything
                  </h1>
                  <p>
                    Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid
                    error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus
                    repellat modi impedit sequi.
                  </p>
                  <div className="btn-box">
                    <Button variant="primary">Shop Now</Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Carousel.Item>

        <Carousel.Item>
          <Container>
            <div className="row justify-content-start">
              <div className="col-md-7 col-lg-6">
                <div className="detail-box  p-4 ">
                  <h1>
                    <span>Sale 20% Off</span>
                    <br /> On Everything
                  </h1>
                  <p>
                    Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid
                    error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus
                    repellat modi impedit sequi.
                  </p>
                  <div className="btn-box">
                    <Button variant="primary">Shop Now</Button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default HomeSlider;
