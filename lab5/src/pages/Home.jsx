import React from 'react'
import HomeSlider from '../components/Homeslider'
import FeatureCards from '../components/Features'
import TestimonialsSection from '../components/Testimonials'
import { ProductCards } from '../components/ProductCards'

export  function Home() {
  return (
    <>
      <HomeSlider></HomeSlider>
      <FeatureCards></FeatureCards>
      <ProductCards></ProductCards>
      <TestimonialsSection></TestimonialsSection>
    </>
  )
}
