import React from 'react';
import { Container, Carousel, Button } from 'react-bootstrap';
import sliderBackground from '../assets/slider-bg.jpg';
const HomeSlider = () => {
  return (
    <section id='sliderSection' className="slider_section position-relative" style={{ height: '98vh', overflow: 'hidden' }}>
      <div className="slider_bg_box position-relative w-100 h-100">
        <img 
          src= {sliderBackground}
          alt="Background" 
          className="w-100  object-fit-cover position-absolute top-0 start-0 "
          style={{ objectFit: 'cover', height: '100vh' }}
        />
      </div>
      <Carousel id="customCarousel1" className="position-absolute top-50 start-0 translate-middle-y w-100" indicators={false} controls={true}>
        <Carousel.Item>
          <Container>
            <div className="row justify-content-start">
              <div className="col-md-7 col-lg-6">
                <div className="detail-box  p-4 ">
                <h1 className='p-2 '>
                    <span className='text-danger fw-bold fs-1'>Sale 10% Off</span>
                    <br /> <span className='text-muted fw-bold fs-1'>On Electronics</span>
                  </h1>
                  <p className='p-2 '>
                    Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid
                    error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus
                    repellat modi impedit sequi.
                  </p>
                  <div className="btn-box ms-1">
                    <Button variant="danger" size='lg'>Shop Now</Button>
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
                <h1 className='p-2'>
                    <span className='text-danger fw-bold fs-1'>Sale 35% Off</span>
                    <br /> <span className='text-muted fw-bold fs-1'>On Fashion</span>
                  </h1>
                  <p className='p-2'>
                    Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid
                    error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus
                    repellat modi impedit sequi.
                  </p>
                  <div className="btn-box ms-1">
                    <Button variant="danger" size='lg'>Shop Now</Button>
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
                  <h1 className='p-2'>
                    <span className='text-danger fw-bold fs-1'>Sale 30% Off</span>
                    <br /> <span className='text-muted fw-bold fs-1'>On Library</span>
                  </h1 >
                  <p className='p-2'>
                    Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid
                    error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus
                    repellat modi impedit sequi.
                  </p>
                  <div className="btn-box ms-1">
                    <Button variant="danger" size='lg'>Shop Now</Button>
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
